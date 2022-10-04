import React, { useEffect, useState } from "react";
import Group from "../../components/Groups/Group";
import "Dashboard.css";
import {IGroup} from "../../interfaces/interface";

function Dashboard() {
  const [groups, setGroups] = useState<IGroup[]>([]);

  useEffect(() => {
    fetchData();
  }, [])

  async function
}

export default Dashboard;