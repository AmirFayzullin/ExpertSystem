import {Option} from "./Option";
import {Title} from "./Title";
import {genId} from "./utils";

export interface INode {
    title: Title,
    id: number,
    clone(): INode
}

class CNode implements INode {
    id: number;
    title: Title;
    constructor({title}: TGoalNode) {
        this.title = title;
        this.id = genId();
    }

    clone() {
        const newNode = new CNode({title: this.title});
        newNode.id = genId();
        return newNode;
    }
}

export type TGoalNode = {
    title: Title
}

export class CGoalNode extends CNode {
    constructor({title}: TGoalNode) {
        super({title})
    }

    clone() {
        const newNode = new CGoalNode({title: this.title});
        newNode.id = genId();
        return newNode;
    }

    load(json: any) {
        this.title = new Title(json.title.title);
        this.id = json.id
    }
}

export type TFactorNode = {
    title: Title,
    options: Option[]
};

export class CFactorNode extends CNode {
    options: Option[];
    constructor({title, options = []}: TFactorNode) {
        super({title});
        this.options = options;
    }

    addOption(option: Option) {
        this.options.push(option);
    }

    removeOption(optionId: number) {
        this.options = this.options.filter(opt => opt.id !== optionId);
    }

    clone() {
        const newOptions = this.options.map(opt => new Option(opt.title));
        const newNode = new CFactorNode({title: this.title, options: newOptions});
        newNode.id = genId();
        return newNode;
    }

    load(json: any) {
        this.title = new Title(json.title?.title);
        this.id = json.id;
        this.options = json.options?.map((opt: Option) => {
            const option = new Option(new Title(opt?.title.title));
            option.load(opt);
            return option
        })
    }
}