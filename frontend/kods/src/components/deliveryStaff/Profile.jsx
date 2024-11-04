import React from 'react';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Divider } from 'primereact/divider';
import { useNavigate } from 'react-router-dom';
import "../../css/deliveryProfile.css"
export default function Profile({userData}) {
    return (
        <div className="profile-view p-4">
            <Card title="Profile Details" className="p-shadow-5">
                <div className="p-d-flex p-jc-center p-mb-4">
                    <Avatar
                        label="AS"
                        size="xlarge"
                        shape="circle"
                        className="p-mb-3"
                        style={{ backgroundColor: "#243c5a", color: "#ffffff" }}
                    />
                </div>
                <Divider />

                <div className="p-d-flex p-flex-column p-ai-center">
                    <div className="p-mb-2">
                        <strong>Staff Name:</strong> {userData.deliveryStaff.staffName}
                    </div>
                    <div className="p-mb-2">
                        <strong>Account ID:</strong> {userData.deliveryStaff.accountId}
                    </div>
                    <div className="p-mb-2">
                        <strong>Staff ID:</strong> {userData.deliveryStaff.staffId}
                    </div>
                    <div className="p-mb-2">
                        <strong>Date of Birth:</strong> {userData.deliveryStaff.dob}
                    </div>
                    <div className="p-mb-2">
                        <strong>Gender:</strong> {userData.deliveryStaff.gender === "Female" ? "Female" : "Male"}
                    </div>
                    <div className="p-mb-2">
                        <strong>Phone Number:</strong> {userData.deliveryStaff.phoneNumber}
                    </div>
                </div>
            </Card>
        </div>
    )
}
