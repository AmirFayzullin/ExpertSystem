import {CFactorNode, CGoalNode, INode} from "./Node";
import {createNode, NODE_TYPES} from "./nodeFactory";
import {Option} from "./Option";
import {Title} from "./Title";
import {genId} from "./utils";
import {Executor} from "./Executor";

type ESCoreSubscriber = () => void

type ESCoreSubscriberObject = {
    id: number,
    cb: ESCoreSubscriber
}

export class ESCore {
    /**
     * fs and gs are factors and goals makes a pool of nodes,
     * which are used as the image for cloned
     */
    private fs: CFactorNode[] = [];
    private gs: CGoalNode[] = [];
    private root: CFactorNode | null = null;
    private subscribers: ESCoreSubscriberObject[] = [];
    isInitialized: boolean = false;

    get factors(): CFactorNode[] {
        return this.fs;
    }

    get goals(): CGoalNode[] {
        return this.gs;
    }

    addFactor(title: string, options: string[]) {
        const factor = <CFactorNode>createNode(NODE_TYPES.FACTOR, {title, options});
        this.fs.push(factor);

        if (!this.root) this.initRoot(factor);

        this.notifySubscribers();
        return factor;
    }

    addGoal(title: string) {
        const goal = <CGoalNode>createNode(NODE_TYPES.GOAL, {title});
        this.gs.push(goal);
        this.notifySubscribers();
        return goal;
    }

    cloneNode(id: number): INode | null {
        let clonned = null;
        const nodesPool = [...this.gs, ...this.fs];

        for (let i = 0; i < nodesPool.length; i++) {
            if (nodesPool[i].id === id) {
                clonned = nodesPool[i].clone();
                break;
            }
        }

        return clonned;
    }

    removeNode(id: number) {
        this.runNLR(this.root, (node: INode) => {
            if (!node) return false;
            const factorNode = <CFactorNode>node;

            // remove factor node from its parent
            if (node instanceof CGoalNode) return false;
            for (let option of factorNode.options) {
                if (option.child && option.child.id === id) {
                    option.child = null;
                    return true;
                }
            }

            return false;
        })
        this.notifySubscribers();
    }

    /**
     *
     * @param nodeToInsert - node to insert
     * @param toOption - option id to be inserted to
     */
    insertNode(nodeToInsert: INode, toOption: number) {
        this.runNLR(this.root, (node: INode) => {
            if (node instanceof CGoalNode) return false;
            const factorNode = <CFactorNode>node;

            for (let option of factorNode.options) {
                if (option.id === toOption) {
                    option.child = nodeToInsert;
                    return true;
                }
            }

            return false;
        })
        this.notifySubscribers();
    }

    runNLR(node: INode | null, cb: (node: INode) => boolean): boolean {
        if (node === null) return false;

        if (cb(node)) return true;

        if (node instanceof CGoalNode) return false;

        // if its a factor node, go through its options
        const factorNode = node as CFactorNode;
        for (let option of factorNode.options) {
            if (this.runNLR(<INode>option.child, cb)) return true;
        }

        return false;
    }

    getRoot() {
        return this.root;
    }

    initRoot(node: CFactorNode) {
        this.root = node;
        this.isInitialized = true;
        this.notifySubscribers();
    }

    subscribe(cb: ESCoreSubscriber) {
        const id = genId();
        this.subscribers.push({id, cb});

        return () => this.subscribers = this.subscribers.filter(s => s.id !== id);
    }

    notifySubscribers() {
        this.subscribers.forEach(sub => sub.cb());
    }

    getExecutor(): Executor {
        if (!this.root) throw new Error("Root is empty");
        return new Executor(this.root);
    }

    load(json: any) {
        const root = new CFactorNode({
            title:new Title(""),
            options: [],
        });
        root.load(json);
        //@ts-ignore
        this.initRoot(root);
        this.loadPools();
    }

    private loadPools() {
        this.runNLR(this.root, (node: INode) => {
            const isFactor = node instanceof CFactorNode;
            if (isFactor) {
                const doesExists = this.fs.findIndex((n: CFactorNode) => n.title === node.title) !== -1
                if (!doesExists) this.fs.push(node);
            } else {
                const doesExists = this.gs.findIndex((n: CGoalNode) => n.title === node.title) !== -1
                if (!doesExists) this.gs.push(node as CGoalNode);
            }
            return false;
        })
    }
}