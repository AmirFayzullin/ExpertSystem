import {ESCore} from "./ExpertSystemCore/ESCore";
import {CFactorNode, CGoalNode, INode} from "./ExpertSystemCore/Node";
import {Option} from "./ExpertSystemCore/Option";

export const initCore = (): ESCore => {
    const core = new ESCore();
    const root = core.addFactor("Do you like going out?", ["Yes", "No"]);
    core.initRoot(root);

    const factor1 = core.addFactor("Do you have time?", ["Yes", "No"]);
    core.insertNode(factor1, root.options[0].id);

    const goal1 = core.addGoal("Go out!");
    core.insertNode(goal1, factor1.options[0].id);

    const goal2 = core.addGoal("Do your stuff!");
    core.insertNode(goal2, factor1.options[1].id);

    const goal3: INode = core.cloneNode(goal2.id) as INode;
    core.insertNode(goal3, root.options[1].id);

    core.removeNode(goal3.id);

    return core;
};

export class HierarchicalMapper {
    private static getEmpty(option: Option) {
        return {
            name: option.title.title + " | Add factor or goal",
            children: [],
            id: option.id,
            isOption: true,
        }
    };

    private static getData(node: INode, parentTitle: string): any {
        return {
            name: (parentTitle ? parentTitle + " | " : "") + node.title.title,
            id: node.id,
            isOption: false,
            children: (node as CFactorNode).options?.map(option => {
                if (!option.child) return this.getEmpty(option);
                return {
                    name: option.title.title + " | " + option.child?.title.title,
                    id: option.child.id,
                    isOption: false,
                    children:
                        (option.child as CFactorNode).options ? [...(option.child as CFactorNode).options?.map(n => {
                                if (!n.child) return this.getEmpty(n);
                                return this.getData(n.child as INode, n.title.title)
                            })]
                            :
                            []
                }
            })
        }
    };

    // private static getData(node: INode, parentTitle: string): any {
    //     return {
    //         name: (parentTitle ? parentTitle : ""),
    //         attributes: [node.title.title],
    //         id: node.id,
    //         isOption: false,
    //         children: (node as CFactorNode).options?.map(option => {
    //             if (!option.child) return this.getEmpty(option);
    //             return {
    //                 name: option.title.title,
    //                 attributes: [option.child?.title.title],
    //                 id: option.child.id,
    //                 isOption: false,
    //                 children:
    //                     (option.child as CFactorNode).options ? [...(option.child as CFactorNode).options?.map(n => {
    //                             if (!n.child) return this.getEmpty(n);
    //                             return this.getData(n.child as INode, n.title.title)
    //                         })]
    //                         :
    //                         []
    //             }
    //         })
    //     }
    // };


    static mapCoreData(core: ESCore) {
        const root = core.getRoot();
        return this.getData(root as INode, "");
    };

}
