import {CFactorNode, CGoalNode, INode, TFactorNode, TGoalNode} from "./Node";
import {Title} from "./Title";
import {Option} from "./Option";

export const NODE_TYPES = {
    FACTOR: "FACTOR",
    GOAL: "GOAL",
};

type OptionsT = {
    title: string,
    options?: string[]
}

const mapOptions = (options: OptionsT) => {
    const nodeTitle = new Title(options.title);
    let nodeOptions: Option[] = [];
    if (options.options) {
        nodeOptions = options.options.map(opt => {
            const optionTitle = new Title(opt);
            return new Option(optionTitle)
        });
    }

    return {
        title: nodeTitle,
        options: nodeOptions
    }
};

export function createNode(type: string, options: OptionsT): INode | null {
    const mappedOptions = mapOptions(options);

    switch(type) {
        case NODE_TYPES.FACTOR:
            return new CFactorNode(mappedOptions as TFactorNode);
        case NODE_TYPES.GOAL:
            return new CGoalNode(mappedOptions as TGoalNode);
        default:
            return null;
    }
}