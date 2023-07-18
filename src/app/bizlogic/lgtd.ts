"use server";

import { useEffect } from "react";
import { insertProject, insertTargetOrders, insertTask, selectAllPorjects, selectTargetOrders, selectTasks, updateTargetOrders } from "../db/lgtd";
import { typeproject } from "../model/lgtd/projects.type";
import { sampleProjects, sampleTasks } from "./SampleDatas";


export const getAllPorjects= async (user_id: string) => {
    const projects = await selectAllPorjects(user_id);
    const orders = await selectTargetOrders(user_id,"projects",0);
    if(orders){
        const orderstrings = orders[0].target_id_order.split(",");
        console.log (orderstrings);
        let orderTasks = orderstrings.map((project_id)=>{
            return projects?.find((task)=> task.id.toString() === project_id)
        }) 
        projects?.forEach(project => {
            if(!orderstrings.includes(project.id.toString())){
                orderTasks.push(project)
            }
        });
        return orderTasks
    }else{
        return projects;
    }


    
};

export const  getProjectTasks = async (user_id: string , project_id :number) => {
    const tasks = await selectTasks(user_id,project_id); 
    const orders = await selectTargetOrders(user_id,"tasks",project_id);
    if(orders && orders[0]){
        const orderstrings = orders[0].target_id_order.split(",");
        console.log (orderstrings);
        let orderTasks = orderstrings.map((task_id)=>{
            return tasks?.find((task)=> task.id.toString() === task_id)
        }) 
        tasks?.forEach(task => {
            if(!orderstrings.includes(task.id.toString())){
                orderTasks.push(task)
            }
        });
        return orderTasks
    }else{
        return tasks;
    }

};

export const  getAllTasks = async (user_id: string) => {
    return sampleTasks;
};

export const addNewProject = async (user_id:string , title:string)=>{
    // insertProject(user_id,title)
    const insproj = await insertProject(user_id,title);
    if(insproj!=null){
        console.log(insproj[0].id);        
        registAddTargetOrders(user_id,"projects",0,insproj[0].id.toString());
    }

    return
}
export const addNewTask = async (user_id:string ,project_id:number, title:string)=>{
    console.log("addNewTask start");
    const instask = await insertTask(user_id,project_id,title);
    if(instask!=null){
        console.log(instask[0].id);        
        registAddTargetOrders(user_id,"tasks",project_id,instask[0].id.toString());
    }
}

const registAddTargetOrders = async(user_id:string,targetName:string , target_id :number , addNumber:string)=>{
    //getTargetOrders


    console.log(targetName , target_id);

    const registedTargetOrders = await selectTargetOrders(user_id,targetName,target_id);

    console.log(registedTargetOrders);
    if(registedTargetOrders!=null && registedTargetOrders[0]!=null){
        //あった時にはupdate
        const newTargetIdOrder = registedTargetOrders[0].target_id_order + ','+ addNumber

        updateTargetOrders(user_id,targetName,target_id,newTargetIdOrder)
    }else{
        //なかった時にはInsert
        insertTargetOrders(user_id,targetName,target_id,    addNumber)

    }

}

//registTargetOrders
export const registTargetOrders = async(user_id:string,targetName:string , target_id :number , task_id_order:string)=>{
    //getTargetOrders


    console.log(targetName , target_id);

    const registedTargetOrders = await selectTargetOrders(user_id,targetName,target_id);

    console.log(registedTargetOrders);
    if(registedTargetOrders!=null && registedTargetOrders[0]!=null){
        //あった時にはupdate
        const newTargetIdOrder = task_id_order

        updateTargetOrders(user_id,targetName,target_id,newTargetIdOrder)
    }else{
        //なかった時にはInsert
        insertTargetOrders(user_id,targetName,target_id, task_id_order)

    }

}

const guest_user_id = process.env.NEXT_PUBLIC_GUEST_USER_ID as
  | string
  | undefined;


