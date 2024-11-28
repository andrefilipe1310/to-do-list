package com.todolist.to_do_list.domain.model.task;

public record TaskResponseDTO(Long id, String description, TaskStatus taskStatus) {
}
