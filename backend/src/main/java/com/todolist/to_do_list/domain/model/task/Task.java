package com.todolist.to_do_list.domain.model.task;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Entity(name = "rb_task")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    @Enumerated()
    private TaskStatus taskStatus;

    public void update(TaskUpdateDTO taskUpdateDTO){
        if (taskUpdateDTO.description() != null && !Objects.equals(taskUpdateDTO.description(), this.description)){
            this.description = taskUpdateDTO.description();
        }

        if (taskUpdateDTO.taskStatus() != null && !Objects.equals(taskUpdateDTO.taskStatus(), this.taskStatus)){
            this.taskStatus = taskUpdateDTO.taskStatus();
        }

    }

}
