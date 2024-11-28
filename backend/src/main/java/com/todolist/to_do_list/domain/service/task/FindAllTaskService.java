package com.todolist.to_do_list.domain.service.task;

import com.todolist.to_do_list.domain.model.task.TaskResponseDTO;
import com.todolist.to_do_list.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FindAllTaskService {

    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private TaskToMapperDTOService taskToMapperDTOService;

    public List<TaskResponseDTO> execute(){
        return taskRepository.findAll()
                .stream().map(task -> {
                    return taskToMapperDTOService.toDTO(task);
                })
                .collect(Collectors.toList());
    }
}
