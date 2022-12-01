import React, {useContext, useEffect, useState} from 'react';
import {HierarchicalMapper} from "../../utils";
import {ESCoreContext} from "../../contexts/ESCoreContext";
import Graph from 'react-d3-tree';
import {ConfirmationPopupServiceContext} from "../../contexts/ConfirmationPopupServiceContext";
import './Tree.css';

const getDynamicPathClass = ({ source, target }, orientation) => {
    return "link";
};

export const Tree = ({handleOptionClick, handleLeafClick}) => {
    const core = useContext(ESCoreContext);

    const confirmationService = useContext(ConfirmationPopupServiceContext);

    const [data, setData] = useState({});

    const updateData = () => {
        const newData = HierarchicalMapper.mapCoreData(core);
        setData(newData);
    };

    const isLeaf = (node) => {
        const hasChildren = node.data.children;
        let allOptionsAreEmpty = false;
        if (hasChildren) {
            allOptionsAreEmpty = node.data.children.every(c => c.children?.length === 0);
        }
        return !hasChildren || allOptionsAreEmpty;
    };

    const handleNodeClick = (node) => {

        if (node.data.isOption) {
            handleOptionClick(node.data.id);
        }
        else if (isLeaf(node)) {
            confirmationService.open({
                text: "Do you really want to remove the node?",
                handleSubmit: () => {
                    handleLeafClick(node.data.id);
                }
            });
        }
    };

    useEffect(() => {
        if (core) {
            updateData();
            return core.subscribe(updateData);  // subscribe returns unsubscribe func
        }
    }, [core]);


    return (
        <Graph data={data}
               onNodeClick={handleNodeClick}
               translate={{
                   x: window.innerWidth / 2,
                   y: window.innerHeight / 2
               }}
               rootNodeClassName="node__root"
               branchNodeClassName="node__branch"
               leafNodeClassName="node__leaf"
               pathClassFunc={getDynamicPathClass}
        />
    )
};