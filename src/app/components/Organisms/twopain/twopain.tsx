"user client";
import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  closestCorners,
  pointerWithin,
  rectIntersection,
} from "@dnd-kit/core";
import { Droppable } from "./Droppable";

import { getAllPorjects, getProjectTasks } from "@/app/bizlogic/lgtd";
import { typeproject, typetask } from "@/app/model/lgtd/projects.type";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { ThisProject } from "./ThisProject";
import { ThisTask } from "./ThisTask";
import EditProject from "./EditProject";
import { NewTask } from "./NewTask";
import EditTask from "./EditTask";
import { NewProject } from "./NewProject";

// export default function Kanban()
export default function Twopain() {
  const [userId, setUserId] = useState("");
  const [thisProjectId, setThisProjectId] = useState(-1);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);

  const [projects, setProjects] = useState<typeproject[]>([]);
  const [tasks, setTasks] = useState<typetask[]>([]);
  const [selectedProject, setSelectedProject] = useState<
    typeproject | undefined
  >(undefined);

  useEffect(() => {
    const getpProjects = async () => {
      const this_userid = "";
      // user.id
      //   ? user.id
      //   : guest_user_id
      //   ? guest_user_id
      //   : ""; //guest_user_id === undefined ? "" : guest_user_id;
      const newsetProjects: typeproject[] = await getAllPorjects(this_userid);
      setUserId(this_userid);
      setProjects(newsetProjects);

      if (thisProjectId < 0) {
        setThisProjectId(2);
        setThisProjectId(newsetProjects[0].id);
        console.log(`thisprojectid = ${newsetProjects[0].id}`);
        console.log(newsetProjects);
      }
    };
    getpProjects();
  }, [userId]);

  useEffect(() => {
    const setThisTasks = async () => {
      const this_userid = "";
      if (thisProjectId >= 0) {
        const newTasks: typetask[] = await getProjectTasks(
          this_userid,
          thisProjectId
        );
        setTasks(newTasks);

        const thisproject = projects.filter(
          (project) => project.id === thisProjectId
        )[0];
        setSelectedProject(thisproject);
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
          return arrayMove(preprojects, activeIndex, overindex);
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
          console.log(active.id.match(ptn)[2], over.id.match(ptn)[2]); // console.log(`active:${active.id}`);// console.log(`over:${over.id}`);
          console.log(activeIndex, overindex); // console.log(`active:${active.id}`);// console.log(`over:${over.id}`);
          return arrayMove(pretasks, activeIndex, overindex);
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
        task.project_id = projects[activeProjectIndex].id;

        setTasks(
          tasks.map((thistask: typetask) =>
            thistask.id === task.id ? (thistask = task) : thistask
          )
        );

        setThisProjectId(task.project_id);

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
        {/* Closest corners Rectangle intersection*/}
        <div className="grid grid-cols-4">
          <div className="col-span-1">
            <div>project</div>
            <SortableContext
              items={projects.map((project) => project.id.toString())}
            >
              {projects.map((project, index) => (
                <Droppable id={project.id.toString()}>
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

                  {/* </ThisProject> */}
                  {/* <EditTask
            task={task}
            setTasks={setTasks}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            projects={projects}
            setThisProjectId={setThisProjectId}
          /> */}
                </Droppable>
              ))}
            </SortableContext>
            <NewProject
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
              <SortableContext
                items={tasks.map(
                  (task) => thisProjectId.toString() + "_" + task.id.toString()
                )}
              >
                {tasks.map((task, index) => (
                  <div>
                    <ThisTask
                      key={task.id}
                      task={task}
                      thisProjectId={thisProjectId}
                    >
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
                userId={0}
                projectId={thisProjectId}
                tasks={tasks}
                setTasks={setTasks}
              ></NewTask>
            </div>
          </div>
        </div>
      </DndContext>
    </div>
  );
}
