import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { Tab, Tabs } from "@mui/material";
import UserDetailsTab from "./userDetailsTab";
import UserOrdersTab from "./userOrdersTab";
import { useUserContext } from "../../contexts/UserContext";
import UsersListTab from "./usersListTab";
export default function UserPage() {
    const [page, setPage] = useState(0);
    const { user } = useUserContext();
    const selectPage = () => {
        switch (page) {
            case 0:
                return <UserDetailsTab />;
            case 1:
                return user?.is_admin ? <UsersListTab /> : <UserOrdersTab />;
            default:
                return <UserDetailsTab />;
        }
    };
    return (
        <div>
            <Navbar />
            <div className="page-layout">
                <Tabs
                    value={page}
                    onChange={(e, v) => setPage(v)}
                    aria-label="basic tabs example"
                >
                    <Tab label="Details" />
                    {user?.is_admin ? (
                        <Tab label="Users" />
                    ) : (
                        <Tab label="Orders" />
                    )}
                </Tabs>
                <div>{selectPage()}</div>
            </div>
        </div>
    );
}
