import React, { Component } from 'react';
function calcColorClass(count){
    count = parseInt(count)
    if(typeof count !== 'number' || isNaN(count) || count<0){
        return 'tag-level-1'
    }
    if(count<100 && count>0){
        return 'tag-level-1'
    }else if(count>=100 && count<1000){
        return 'tag-level-2'
    }else{
        return 'tag-level-3'
    }
}

function Tag(props){
    const {name, count} = props;
    const colorClass = calcColorClass(count)
    return <span className={`tag ${colorClass}`}>{name}</span>

}
export default Tag;