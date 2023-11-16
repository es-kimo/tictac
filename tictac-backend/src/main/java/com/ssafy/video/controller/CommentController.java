package com.ssafy.video.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.video.model.dto.Comment;
import com.ssafy.video.model.dto.Video;
import com.ssafy.video.model.service.CommentService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@CrossOrigin
public class CommentController {
	
	@Autowired
	CommentService commentService;

	
	// 댓글 목록 조회
		@GetMapping("/video/{videoId}/comment")
		private ResponseEntity<?> detail(@PathVariable String videoId) {
			List<Comment> list = commentService.getCommentList(videoId);
			if (list == null || list.size() == 0) {
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<List<Comment>>(list, HttpStatus.OK);
		}
		
		// 댓글 등록
		@PostMapping("/video/{videoId}/comment")
		private ResponseEntity<Comment> upload(@RequestBody Comment comment) {
			commentService.insertComment(comment);
			return new ResponseEntity<Comment>(comment, HttpStatus.OK);
		}
		
		// 댓글 수정
		@PutMapping("/video/{videoId}/comment")
		private ResponseEntity<Void> update(@RequestBody Comment comment) {
			commentService.updateComment(comment);
			return new ResponseEntity<Void>(HttpStatus.OK);
		}
		
		// 댓글 삭제
		@DeleteMapping("/video/{videoId}/comment")
		private ResponseEntity<Void> delete(@RequestBody int commentId) {
			commentService.deleteComment(commentId);
			return new ResponseEntity<Void>(HttpStatus.OK);
		}

}
