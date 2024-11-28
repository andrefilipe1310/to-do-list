package com.todolist.to_do_list.domain.service.task;

import com.todolist.to_do_list.domain.model.task.Task;
import com.todolist.to_do_list.domain.model.task.TaskResponseDTO;
import com.todolist.to_do_list.domain.model.task.TaskResquestDTO;
import com.todolist.to_do_list.domain.model.task.TaskUpdateDTO;
import com.todolist.to_do_list.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpdateTaskService {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private TaskToMapperDTOService taskToMapperDTOService;

    public TaskResponseDTO execute(TaskUpdateDTO taskUpdateDTO, Long id){
        Task task = taskRepository.findById(id)
                .orElseThrow(()->{
                    return new RuntimeException("Task not found.");
                });
        task.update(taskUpdateDTO);

        return taskToMapperDTOService.toDTO(this.taskRepository.save(task));
    }
}
