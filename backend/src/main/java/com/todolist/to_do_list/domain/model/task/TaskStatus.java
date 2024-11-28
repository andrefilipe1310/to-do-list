package com.todolist.to_do_list.domain.model.task;

public enum TaskStatus {
    CREATED("created"),
    IN_PROGRESS("inProgress"),
    COMPLETED("completed");

    private String status;

     TaskStatus(String status){
        this.status = status;
    }
}
