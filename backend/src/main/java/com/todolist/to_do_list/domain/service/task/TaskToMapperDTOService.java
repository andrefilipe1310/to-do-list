package com.todolist.to_do_list.domain.service.task;


import com.todolist.to_do_list.domain.model.task.Task;
import com.todolist.to_do_list.domain.model.task.TaskResponseDTO;
import com.todolist.to_do_list.domain.model.task.TaskResquestDTO;
import com.todolist.to_do_list.domain.model.task.TaskStatus;
import org.springframework.stereotype.Service;

@Service
public class TaskToMapperDTOService {

    public TaskResponseDTO toDTO(Task task){
        return new TaskResponseDTO(
                task.getId(),
                task.getDescription(),
                task.getTaskStatus()
        );
    }

    public Task toEntity(TaskResquestDTO taskResquestDTO){
        Task task = new Task();
        task.setDescription(taskResquestDTO.description());
        task.setTaskStatus(TaskStatus.CREATED);
        return task;
    }
}
