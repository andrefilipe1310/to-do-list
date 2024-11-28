package com.todolist.to_do_list.controller;


import com.todolist.to_do_list.domain.model.task.TaskResponseDTO;
import com.todolist.to_do_list.domain.model.task.TaskResquestDTO;
import com.todolist.to_do_list.domain.model.task.TaskUpdateDTO;
import com.todolist.to_do_list.domain.service.task.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {
    @Autowired
    private CreateTaskService createTaskService;
    @Autowired
    private FindByIdTaskService findByIdTaskService;
    @Autowired
    private FindAllTaskService findAllTaskService;
    @Autowired
    private UpdateTaskService updateTaskService;
    @Autowired
    private DeleteByIdTaskService deleteByIdTaskService;



    @PostMapping
    public ResponseEntity<TaskResponseDTO> create(@RequestBody TaskResquestDTO taskResquestDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(createTaskService.execute(taskResquestDTO));
    }
    @GetMapping
    public ResponseEntity<List<TaskResponseDTO>> findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(findAllTaskService.execute());
    }
    @GetMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> findById(@PathVariable("id") Long id){
        return ResponseEntity.status(HttpStatus.OK).body(findByIdTaskService.execute(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> update(@RequestBody TaskUpdateDTO taskUpdateDTO,@PathVariable("id") Long id){
        return ResponseEntity.status(HttpStatus.OK).body(updateTaskService.execute(taskUpdateDTO,id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Long id){
        deleteByIdTaskService.execute(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
