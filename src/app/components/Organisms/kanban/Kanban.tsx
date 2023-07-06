// import "./styles.css";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import Column, { ColumnType } from "./Column";
import { useEffect, useState } from "react";
import { getAllPorjects, getProjectTasks } from "@/app/bizlogic/lgtd";
import { typeproject, typetask } from "@/app/model/lgtd/projects.type";
import Project, { ProjectType } from "./Project";
import { CardType } from "./Task";

export default function Kanban() {
  const [projects, setProjects] = useState<typeproject[]>([]);
  const [tasks, setTasks] = useState<typetask[]>([]);
  const [userId, setUserId] = useState("");
  const [columns, setColumns] = useState<ColumnType[]>([]);

  // 仮データを定義
  const data: ColumnType[] = [
    {
      id: "Column1",
      title: "Column1",
      cards: [
        {
          id: "Card1",
          title: "Card1",
        },
        {
          id: "Card2",
          title: "Card2",
        },
      ],
    },
    {
      id: "Column2",
      title: "Column2",
      cards: [
        {
          id: "Card3",
          title: "Card3",
        },
        {
          id: "Card4",
          title: "Card4",
        },
      ],
    },
  ];

  useEffect(() => {
    const getpProjects = async () => {
      const this_userid = "";
      // user.id
      //   ? user.id
      //   : guest_user_id
      //   ? guest_user_id
      //   : ""; //guest_user_id === undefined ? "" : guest_user_id;
      const dbnewsetProjects: typeproject[] = await getAllPorjects(this_userid);
      // setProjects(newsetProjects);

      // ループを使用して個々の要素をコピーする
      const ColumnTypes: ColumnType[] = [];

      for (const item of dbnewsetProjects) {
        const thisTasks: typetask[] = await getProjectTasks(
          this_userid,
          item.id
        );

        const Cards: CardType[] = [];
        for (const each of thisTasks) {
          const card: CardType = {
            id: each.id.toString(),
            title: each.title,
          };
          Cards.push(card);
        }

        const copiedItem: ColumnType = {
          id: item.id.toString(),
          title: item.title,
          cards: Cards,
        };
        ColumnTypes.push(copiedItem);
      }

      setColumns(ColumnTypes);
    };
    getpProjects();
  }, [userId]);

  // useEffect(() => {
  //   const setThisTasks = async () => {
  //     const this_userid = "";
  //     // user.id
  //     //   ? user.id
  //     //   : guest_user_id
  //     //   ? guest_user_id
  //     //   : ""; //guest_user_id === undefined ? "" : guest_user_id;
  //     if (thisProjectId >= 0) {
  //       const newTasks: typetask[] = await getProjectTasks(
  //         this_userid,
  //         thisProjectId
  //       );
  //       setTasks(newTasks);

  //       const thisproject = projects.filter(
  //         (project) => project.id === thisProjectId
  //       )[0];
  //       setSelectedProject(thisproject);
  //     }
  //   };
  //   setThisTasks();
  // }, [thisProjectId]);

  const findColumn = (unique: string | null) => {
    if (!unique) {
      return null;
    }
    // overの対象がcolumnの場合があるためそのままidを返す
    if (columns.some((c) => c.id === unique)) {
      return columns.find((c) => c.id === unique) ?? null;
    }
    const id = String(unique);
    const itemWithColumnId = columns.flatMap((c) => {
      const columnId = c.id;
      return c.cards.map((i) => ({ itemId: i.id, columnId: columnId }));
    });
    const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId;
    return columns.find((c) => c.id === columnId) ?? null;
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return null;
    }
    setColumns((prevState) => {
      const activeItems = activeColumn.cards;
      const overItems = overColumn.cards;
      const activeIndex = activeItems.findIndex((i) => i.id === activeId);
      const overIndex = overItems.findIndex((i) => i.id === overId);
      const newIndex = () => {
        const putOnBelowLastItem =
          overIndex === overItems.length - 1 && delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      };
      return prevState.map((c) => {
        if (c.id === activeColumn.id) {
          c.cards = activeItems.filter((i) => i.id !== activeId);
          return c;
        } else if (c.id === overColumn.id) {
          c.cards = [
            ...overItems.slice(0, newIndex()),
            activeItems[activeIndex],
            ...overItems.slice(newIndex(), overItems.length),
          ];
          return c;
        } else {
          return c;
        }
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log(active, over);
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return null;
    }
    const activeIndex = activeColumn.cards.findIndex((i) => i.id === activeId);
    const overIndex = overColumn.cards.findIndex((i) => i.id === overId);
    if (activeIndex !== overIndex) {
      setColumns((prevState) => {
        return prevState.map((column) => {
          if (column.id === activeColumn.id) {
            column.cards = arrayMove(overColumn.cards, activeIndex, overIndex);
            return column;
          } else {
            return column;
          }
        });
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    // 今回は長くなってしまうためsensors、collisionDetectionなどに関しての説明は省きます。
    // ひとまずは一番使われていそうなものを置いています。
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div style={{ display: "flex", flexDirection: "row", padding: "20px" }}>
        <SortableContext items={columns} strategy={rectSortingStrategy}>
          {columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              cards={column.cards}
            ></Column>
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
