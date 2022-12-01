import {Title} from "./Title";
import {genId} from "./utils";
import {CFactorNode, CGoalNode, INode} from "./Node";

export class Option {
    id: number;
    title: Title;
    child: INode | null = null;
    constructor(title: Title) {
        this.title = title;
        this.id = genId();
    }

    load(json: any) {
        this.title = new Title(json.title.title);
        this.id = json.id;

        if (!json.child) return null;
        const isFactor = json.child.hasOwnProperty("options");
        let child = null;
        if (isFactor) {
            child = new CFactorNode({title: new Title(""), options: []});
            child.load(json.child);
        } else {
            child = new CGoalNode({title: new Title("")});
            child.load(json.child);
        }

        this.child = child;
    }
}