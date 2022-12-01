import {CFactorNode, CGoalNode, INode} from "./Node";

export class Executor {
    private currentStep: INode;
    private path: INode[] = [];
    private finished: boolean = false;
    constructor(root: INode) {
        this.currentStep = root;
    }

    getCurrent(): INode {
        return this.currentStep;
    }

    next(id: number): INode {
        if (this.finished) throw new Error("Executing finished");

        let newStep: INode | null = null;

        for (let opt of (this.getCurrent() as CFactorNode).options) {
            if (opt.id === id) {
                newStep = opt.child;
                break;
            }
        }

        if (newStep === null) throw new Error("Incorrect id");
        if (newStep instanceof CGoalNode) this.finished = true;

        this.path.push(this.getCurrent());
        this.currentStep = newStep;

        return this.getCurrent();
    }

    back(): INode {
        const prevStep = this.path.pop();

        if (!prevStep) throw new Error("path is empty");

        this.currentStep = prevStep;

        return this.getCurrent();
    }

    isFinished(): boolean {
        return this.finished
    }
}