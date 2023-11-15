package com.ssafy.video.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.video.model.dto.Video;
import com.ssafy.video.model.service.VideoService;

import io.swagger.annotations.ApiParam;

@RestController
@CrossOrigin
public class VideoController {

	@Autowired
	CommentService CommentService;

	@Autowired
	VideoService videoService;

	// 전체 비디오 리스트 가져오기
	@GetMapping("/videoList")
	private ResponseEntity<?> wholeList() {
		List<Video> list = videoService.getWholeList());
		return new ResponseEntity<List<Video>>(list, HttpStatus.OK);
	}

	// 검색해서 비디오 리스트 가져오기
	// RequestParam도 같이써야하나
	@GetMapping("/videoList/search")
		private ResponseEntity<?> searchList(@ApiParam(
			    name =  "searchWord",
			    type = "String",
			    value = "search condition",
			    example = "skate board",
			    required = true) String searchWord) {
			List<Video> list = videoService.getListBySearchWord(searchWord));
			if (list == null || list.size() == 0) {
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<List<Video>>(list, HttpStatus.OK);
		}

	// 카테고리별 영상 리스트 가져오기
	@GetMapping("/videoList/{categoryId}")
	private ResponseEntity<?> categoryList(@PathVariable String categoryId) {
		List<Video> list = videoService.getListByCategoryID(categoryId);
		if (list == null || list.size() == 0) {
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Video>>(list, HttpStatus.OK);
	}

	// 해당 유저의 업로드리스트
	@GetMapping("uploadList/{userId}")
	private ResponseEntity<?> uploadList(@PathVariable String userId) {
		List<Video> list = videoService.getUploadList(userId);
		if (list == null || list.size() == 0) {
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Video>>(list, HttpStatus.OK);
	}

	// 로그인된 사용자가 자기꺼만 볼수있어야함
	// 해당 유저의 찜리스트
	@GetMapping("myBookmarkList/{userId}")
	private ResponseEntity<?> myBookmarkList(@PathVariable String userId) {
		List<Video> list = videoService.getMyBookmarkList(userId);
		if (list == null || list.size() == 0) {
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Video>>(list, HttpStatus.OK);
	}

}
