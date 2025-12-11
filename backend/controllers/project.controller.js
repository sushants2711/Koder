import mongoose from "mongoose";
import projectModel from "../models/project.model.js";
import userModel from "../models/user.model.js";


const createStartUpCode = (language) => {

    switch (language) {
        case "Python":
            return `print("Hello World")`;

        case "Java":
            return `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`;

        case "JavaScript":
            return `console.log("Hello World");`;

        case "Cpp":
            return `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World" << endl;
    return 0;
}`;

        case "C":
            return `#include <stdio.h>

int main() {
    printf("Hello World\\n");
    return 0;
}`;

        case "go":
            return `package main
import "fmt"

func main() {
    fmt.Println("Hello World")
}`;

        case "bash":
            return `#!/bin/bash
echo "Hello World"`;

        default:
            return null;
    };
};


export const createProjectController = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const { name, projectLanguage } = req.body;

        if (!loggedInUser) {
            return res.status(400).json({ success: false, message: "User not loggedIn" });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({ success: false, message: "Invalid Id" });
        };

        const userExist = await userModel.findById(loggedInUser);

        if (!userExist) {
            return res.status(400).json({ success: false, message: "User not Exist" });
        };

        const startUpCode = createStartUpCode(projectLanguage)

        const newProjectData = new projectModel({
            name,
            projectLanguage,
            code: startUpCode,
            user: loggedInUser
        });

        const savedData = await newProjectData.save();

        return res.status(201).json({ success: true, message: "Project Saved Successfully", data: savedData });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    };
};

export const updateProjectCodeController = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const { id } = req.params;

        const { code } = req.body;

        if (!loggedInUser) {
            return res.status(400).json({ success: false, message: "User not loggedIn" });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({ success: false, message: "Invalid Id" });
        };

        if (!id) {
            return res.status(400).json({ success: false, message: "Id is missing" });
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid Id" });
        };

        const userExist = await userModel.findById(loggedInUser);

        if (!userExist) {
            return res.status(400).json({ success: false, message: "User not Exist" });
        };

        const projectExist = await projectModel.findOne({ user: loggedInUser, _id: id })

        if (!projectExist) {
            return res.status(400).json({ success: false, message: "Project not Exist" });
        };

        const updateCode = await projectModel.findByIdAndUpdate(projectExist._id, { code }, { new: true });

        if (!updateCode) {
            return res.status(400).json({ success: false, message: "Error Occured while saving the code" });
        };

        return res.status(200).json({ success: true, message: "Code Saved Successfully", data: updateCode });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    };
};

export const getAllProjectsController = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res.status(400).json({ success: false, message: "User not loggedIn" });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({ success: false, message: "Invalid Id" });
        };

        const userExist = await userModel.findById(loggedInUser);

        if (!userExist) {
            return res.status(400).json({ success: false, message: "User not Exist" });
        };

        const allProject = await projectModel.find({ user: loggedInUser }).sort({ createdAt: -1 });

        if (!allProject || allProject.length === 0) {
            return res.status(400).json({ success: false, message: "No Project found" });
        };

        return res.status(200).json({ success: true, message: "Data fetch Successfully", data: allProject });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    };
};

export const getProjectByIdController = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const { id } = req.params;

        if (!loggedInUser) {
            return res.status(400).json({ success: false, message: "User not loggedIn" });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({ success: false, message: "Invalid Id" });
        };

        if (!id) {
            return res.status(400).json({ success: false, message: "Id is missing" });
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid Id" });
        };

        const userExist = await userModel.findById(loggedInUser);

        if (!userExist) {
            return res.status(400).json({ success: false, message: "User not Exist" });
        };

        const getProject = await projectModel.findOne({ user: loggedInUser, _id: id });

        if (!getProject) {
            return res.status(400).json({ success: false, message: "Project not found" });
        };

        return res.status(200).json({ success: true, message: "Project fetch Successfully", data: getProject });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    };
};

export const deleteProjectController = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const { id } = req.params;

        if (!loggedInUser) {
            return res.status(400).json({ success: false, message: "User not loggedIn" });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({ success: false, message: "Invalid Id" });
        };

        if (!id) {
            return res.status(400).json({ success: false, message: "Id is missing" });
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid Id" });
        };

        const userExist = await userModel.findById(loggedInUser);

        if (!userExist) {
            return res.status(400).json({ success: false, message: "User not Exist" });
        };

        const projectExist = await projectModel.findOne({ user: loggedInUser, _id: id });

        if (!projectExist) {
            return res.status(400).json({ success: false, message: "Project not found" });
        };

        const deleteData = await projectModel.findOneAndDelete({ user: loggedInUser, _id: id });

        if (!deleteData) {
            return res.status(400).json({ success: false, message: "Error Occured While deleting the project" });
        };

        return res.status(200).json({ success: true, message: "Project Delete Successfully" });

    } catch (error) {

    };
};

export const updateProjectNameController = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const { id } = req.params;

        const { name } = req.body;

        if (!loggedInUser) {
            return res.status(400).json({ success: false, message: "User not loggedIn" });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({ success: false, message: "Invalid Id" });
        };

        if (!id) {
            return res.status(400).json({ success: false, message: "Id is missing" });
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid Id" });
        };

        const userExist = await userModel.findById(loggedInUser);

        if (!userExist) {
            return res.status(400).json({ success: false, message: "User not Exist" });
        };

        const projectExist = await projectModel.findOne({ user: loggedInUser, _id: id })

        if (!projectExist) {
            return res.status(400).json({ success: false, message: "Project not Exist" });
        };

        const updateCode = await projectModel.findByIdAndUpdate(projectExist._id, { name }, { new: true });

        if (!updateCode) {
            return res.status(400).json({ success: false, message: "Error Occured while Updating the name" });
        };

        return res.status(200).json({ success: true, message: "Name Updated Successfully", data: updateCode });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    };
};
