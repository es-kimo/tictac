package com.ssafy.video.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.video.model.dao.VideoDao;
import com.ssafy.video.model.dto.Video;

@Service
public class VideoServiceImpl implements VideoService {

	private VideoDao videoDao;
	
	@Autowired
	public void setVideoDao(VideoDao videoDao) {
		this.videoDao = videoDao;
	}
	
	
	@Override
	public List<Video> getWholeList() {
		return videoDao.selectAllVideo();
	}

	@Override
	public List<Video> getListBySearchWord(String searchWord) {
		return videoDao.selectBySearchWord(searchWord);
	}

	@Override
	public List<Video> getListByCategoryId(String categoryId) {
		return videoDao.selectByCategoryId(categoryId);
	}

	@Override
	public List<Video> getUploadList(String userId) {
		return videoDao.selectUploadList(userId);
	}

	@Override
	public List<Video> getMyBookmarkList(String userId) {
		return videoDao.selectMyBookmarkList(userId);
	}

	
	
	@Override
	public Video getVideoDetail(int videoId) {
		videoDao.updateViewCnt(videoId);
		return videoDao.selectOneVideo(videoId);
	}

	@Override
	public int uploadVideo(Video video) {
		return videoDao.insertVideo(video);
	}

	@Override
	public int modifyVideo(Video video) {
		return videoDao.updateVideo(video);
	}

	@Override
	public int removeVideo(int videoId) {
		return videoDao.deleteVideo(videoId);
	}

	

}
