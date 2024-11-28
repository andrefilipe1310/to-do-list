package com.todolist.to_do_list.domain.service.task;


import com.todolist.to_do_list.domain.model.task.TaskResponseDTO;
import com.todolist.to_do_list.domain.model.task.TaskResquestDTO;
import com.todolist.to_do_list.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreateTaskService {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private TaskToMapperDTOService taskToMapperDTOService;

    public TaskResponseDTO execute(TaskResquestDTO taskResquestDTO){
        return taskToMapperDTOService
                .toDTO(taskRepository
                        .save(taskToMapperDTOService.toEntity(taskResquestDTO)));
    }
}
