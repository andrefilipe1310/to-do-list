package com.todolist.to_do_list.domain.service.task;


import com.todolist.to_do_list.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeleteByIdTaskService {
    @Autowired
    private TaskRepository taskRepository;

    public void execute(Long id){
        if (!taskRepository.existsById(id)){
            throw new RuntimeException("Task not exists.");
        }
        this.taskRepository.deleteById(id);
    }
}
