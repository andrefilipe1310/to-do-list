package com.todolist.to_do_list.repository;

import com.todolist.to_do_list.domain.model.task.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
}
