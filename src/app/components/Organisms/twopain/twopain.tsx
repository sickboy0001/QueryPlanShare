"use client";

import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  closestCorners,
  pointerWithin,
  rectIntersection,
} from "@dnd-kit/core";
import { Droppable } from "./Droppable";

import {
  addNewProject,
  getAllPorjects,
  getProjectTasks,
  registTargetOrders,
} from "@/app/bizlogic/lgtd";
import { typeproject, typetask } from "@/app/model/lgtd/projects.type";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { ThisProject } from "./ThisProject";
import { ThisTask } from "./ThisTask";
import EditProject from "./EditProject";
import { NewTask } from "./NewTask";
import EditTask from "./EditTask";
import { NewProject } from "./NewProject";

type Props = {
  userId: string;
};

// export default function Kanban()
export default function Twopain(props: Props) {
  const { userId } = props;
  const [thisProjectId, setThisProjectId] = useState(-1);

  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);

  const [projects, setProjects] = useState<any>();
  const [tasks, setTasks] = useState<any>([]);
  const [selectedProject, setSelectedProject] = useState<any>(0);

  useEffect(() => {
    const getpProjects = async () => {
      console.log(userId);
      const this_userid = userId;
      //guest_user_id === undefined ? "" : guest_user_id;
      if (userId) {
        const newsetProjects = await getAllPorjects(this_userid);
        if (newsetProjects !== null && newsetProjects.length !== 0) {
          setProjects(newsetProjects);
        } else {
          const newTitle = "inbox";
          //todo　データ登録　読み取り
          const result = await addNewProject(userId, newTitle);
          const newsetProjects2 = await getAllPorjects(this_userid);
          setProjects(newsetProjects2);
        }
      }

      // if (thisProjectId < 0) {
      //   setThisProjectId(2);
      //   setThisProjectId(newsetProjects[0].id);
      //   console.log(`thisprojectid = ${newsetProjects[0].id}`);
      //   console.log(newsetProjects);
      // }
    };
    getpProjects();
  }, [userId]);

  useEffect(() => {
    const setThisTasks = async () => {
      if (thisProjectId >= 0) {
        const newProject = projects.filter(
          (project: any) => project.id === thisProjectId
        )[0];
        setSelectedProject(newProject);
        // console.log(projects.filter((project) => project.id === thisProjectId));

        const Tasks = await getProjectTasks(userId, thisProjectId);
        setTasks(Tasks);

        // const thisproject = projects.filter(
        //   (project) => project.id === thisProjectId
        // )[0];
        // setSelectedProject(thisproject);
      }
    };
    setThisTasks();
  }, [thisProjectId]);

  function handleDragEndTask(event: any) {
    const { active, over } = event;

    //     console.log("ProjectTasks_drag and called"); // console.log(`active:${active.id}`);// console.log(`over:${over.id}`);

    if (active != null && over != null && active.id !== over.id) {
      //active=task(x)    over=task(x)  active=project(x_x)  over=project(x_X)
      const ptn = new RegExp("(.*)_(.*)");
      console.log(
        `tasks drag and called active.id ${active.id} over.id ${over.id}`
      ); // console.log(`active:${active.id}`);// console.log(`over:${over.id}`);
      //active=project(x)    over project(z)
      if (!ptn.test(active.id) && !ptn.test(over.id)) {
        setProjects((preprojects: any) => {
          //順番の入手：連想配列内の特定の項目が対象の場合はfindIndexを利用する。
          const activeIndex = preprojects.findIndex(
            ({ id }: typeproject) => id.toString() === active.id
          );
          const overindex = preprojects.findIndex(
            ({ id }: typeproject) => id.toString() === over.id
          );
          //配列の移動　activeIndex　移動元番号, overindex　移動先番号
          console.log(activeIndex, overindex); // console.log(`active:${active.id}`);// console.log(`over:${over.id}`);
          const ptninbox = new RegExp("inbox");
          if (
            ptninbox.test(preprojects[activeIndex].title) ||
            ptninbox.test(preprojects[overindex].title)
          ) {
            console.log("not dnd reason use inbox");
            return preprojects;
          } else {
            const newProjects = arrayMove(preprojects, activeIndex, overindex);
            const newProjectsOrder = newProjects
              .map((newTask: any) => newTask.id.toString())
              .join();
            if (newProjectsOrder) {
              registTargetOrders(userId, "projects", 0, newProjectsOrder);
            }
            console.log(newProjects);
            return newProjects;
          }
        });
      }
      //active=task(x_y)    over task(z-w)
      if (ptn.test(active.id) && ptn.test(over.id)) {
        setTasks((pretasks: any) => {
          //順番の入手：連想配列内の特定の項目が対象の場合はfindIndexを利用する。
          const activeIndex = pretasks.findIndex(
            ({ id }: typetask) => id.toString() === active.id.match(ptn)[2]
          );
          const overindex = pretasks.findIndex(
            ({ id }: typetask) => id.toString() === over.id.match(ptn)[2]
          );
          //配列の移動　activeIndex　移動元番号, overindex　移動先番号
          // console.log(active.id.match(ptn)[2], over.id.match(ptn)[2]); // console.log(`active:${active.id}`);// console.log(`over:${over.id}`);
          // console.log(activeIndex, overindex); // console.log(`active:${active.id}`);// console.log(`over:${over.id}`);
          const thisprojectid = pretasks[activeIndex].project_id;
          const newTasks = arrayMove(pretasks, activeIndex, overindex);
          const newTasksOrder = newTasks
            .map((newTask: any) => newTask.id.toString())
            .join();
          if (newTasksOrder) {
            registTargetOrders(userId, "tasks", thisprojectid, newTasksOrder);
          }
          return newTasks;
        });
      }
      //active=task(x_y)    over project(z)
      if (ptn.test(active.id) && !ptn.test(over.id)) {
        console.log(`over project:${over.id} drop task:${active.id}`);

        // task.project_id = selected.id;
        // // setTitle(title);
        // task.title = title;
        // task.detail = detail;
        // task.action_plan = actionPlan;
        // task.review = review;

        // setPretask(task);

        const activetaskindex = tasks.findIndex(
          ({ id }: typetask) => id.toString() === active.id.match(ptn)[2]
        );
        const task = tasks[activetaskindex];

        const activeProjectIndex = projects.findIndex(
          ({ id }: typeproject) => id.toString() === over.id
        );
        // task.project_id = projects[activeProjectIndex].id;

        // setTasks(
        //   tasks.map((thistask: typetask) =>
        //     thistask.id === task.id ? (thistask = task) : thistask
        //   )
        // );

        // setThisProjectId(task.project_id);

        console.log(task);
      }
    }
  }

  return (
    <div>
      <DndContext
        onDragEnd={handleDragEndTask}
        collisionDetection={pointerWithin}
      >
        <div className="grid grid-cols-4">
          <div className="col-span-1">
            <div>project</div>
            {projects ? (
              <div>
                <SortableContext
                  items={projects.map((project: any) => project.id.toString())}
                >
                  {projects.map((project: any) => (
                    <Droppable
                      key={project.id.toString()}
                      id={project.id.toString()}
                    >
                      <ThisProject
                        key={project.id}
                        project={project}
                        setThisProjectId={setThisProjectId}
                      >
                        <EditProject
                          project={project}
                          isOpen={isProjectOpen}
                          setIsOpen={setIsProjectOpen}
                        />
                      </ThisProject>
                    </Droppable>
                  ))}
                </SortableContext>
              </div>
            ) : (
              ""
            )}
            <NewProject
              userId={userId}
              projects={projects}
              setProjects={setProjects}
            ></NewProject>
          </div>

          <div className="col-span-3">
            <div>task</div>
            <div>
              {selectedProject
                ? "[" + selectedProject.id + "]" + selectedProject.title
                : ""}
            </div>
            <div>
              {projects ? (
                <div>
                  <SortableContext
                    items={tasks.map(
                      (task: any) =>
                        thisProjectId.toString() + "_" + task.id.toString()
                    )}
                  >
                    {tasks.map((task: any) => (
                      <div key={task.id}>
                        <ThisTask task={task} thisProjectId={thisProjectId}>
                          <EditTask
                            task={task}
                            setTasks={setTasks}
                            isOpen={isTaskOpen}
                            setIsOpen={setIsTaskOpen}
                            projects={projects}
                            setThisProjectId={setThisProjectId}
                          />
                        </ThisTask>
                      </div>
                    ))}
                  </SortableContext>
                  <NewTask
                    userId={userId}
                    projectId={thisProjectId}
                    setTasks={setTasks}
                    setSelectedProject={setSelectedProject}
                  ></NewTask>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </DndContext>
    </div>
  );
}
