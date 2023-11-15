package com.ssafy.video.model.dto;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Video {
	
	private int videoId;
	private String userId;
	private String content;
	private String videoSrc;
	private String regDate;
	private int heartCount;
	private int bookmarkCount;
	private String categoryId;
	
	public Video() {
		this.regDate = (new SimpleDateFormat("yyyy-MM-dd")).format(new Date()).toString();
	}
	
	public Video(int videoId, String userId, String content, String videoSrc, int heartCount,
			int bookmarkCount, String categoryId) {
		super();
		this.videoId = videoId;
		this.userId = userId;
		this.content = content;
		this.videoSrc = videoSrc;
		this.regDate = (new SimpleDateFormat("yyyy-MM-dd")).format(new Date()).toString();
		this.heartCount = 0;
		this.bookmarkCount = 0;
		this.categoryId = categoryId;
	}
	
	
	public int getVideoId() {
		return videoId;
	}
	public void setVideoId(int videoId) {
		this.videoId = videoId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getVideoSrc() {
		return videoSrc;
	}
	public void setVideoSrc(String videoSrc) {
		this.videoSrc = videoSrc;
	}
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public int getHeartCount() {
		return heartCount;
	}
	public void setHeartCount(int heartCount) {
		this.heartCount = heartCount;
	}
	public int getBookmarkCount() {
		return bookmarkCount;
	}
	public void setBookmarkCount(int bookmarkCount) {
		this.bookmarkCount = bookmarkCount;
	}
	public String getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}
	
	@Override
	public String toString() {
		return "Video [videoId=" + videoId + ", userId=" + userId + ", content=" + content + ", videoSrc=" + videoSrc
				+ ", regDate=" + regDate + ", heartCount=" + heartCount + ", bookmarkCount=" + bookmarkCount
				+ ", categoryId=" + categoryId + "]";
	}


}
