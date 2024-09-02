import React from "react";
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import RoomIcon from '@mui/icons-material/Room';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

export const SidebarData = [
    {
        title: "Manage Lecturers",
        icon: <RecentActorsIcon />,
        link: "/managelecturers"
    },
    {
        title: "Manage Students",
        icon: <Diversity3Icon />,
        link: "/managestudents"
    },
    {
        title: "Manage Modules",
        icon: <CastForEducationIcon />,
        link: "/managemodules"
    },
    {
        title: "Manage Lecture Halls",
        icon: <RoomIcon />,
        link: "/managehalls"
    },
    {
        title: "Generate Timetables",
        icon: <ScheduleIcon />,
        link: "/generatetimetable"
    },
    {
        title: "Manage Timetables",
        icon: <EditCalendarIcon />,
        link: "/managetimetables"
    },
]