package com.ssafy.video.model.service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.imageio.ImageIO;

import org.bytedeco.javacv.FFmpegFrameGrabber;
import org.bytedeco.javacv.Frame;
import org.bytedeco.javacv.Java2DFrameConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.video.model.dao.VideoDao;
import com.ssafy.video.model.dto.Video;

@Service
public class VideoServiceImpl implements VideoService {

	private VideoDao videoDao;
	
	@Autowired
	ResourceLoader resLoader;
	private static final Logger logger = LoggerFactory.getLogger(VideoServiceImpl.class);
	
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
	public int uploadVideo(Video video, MultipartFile file) {
		try {
			fileHandling(video, file);
		} catch (IOException e) {
			e.printStackTrace();
			//위에서 실패할 시 0을 리턴하면 될 것인가?
			return 0;
		}
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

	private void fileHandling(Video video, MultipartFile file) throws IOException {
		Resource res = resLoader.getResource("resources/upload");
		logger.debug("res: {}", res.getFile().getCanonicalPath());
		if (file != null && file.getSize()>0) {
			//1. 비디오 저장
			video.setVideoSrc(System.currentTimeMillis() + "_" + file.getOriginalFilename());
			video.setOrgVideoSrc(file.getOriginalFilename());
			file.transferTo(new File(res.getFile().getCanonicalPath() + "/" + video.getVideoSrc()));
			
			//2. 썸네일 저장
			//https://stackoverflow.com/questions/37163978/how-to-get-a-thumbnail-of-an-uploaded-video-file
			FFmpegFrameGrabber frameGrabber = new FFmpegFrameGrabber(res.getFile().getCanonicalPath() + "/" + video.getVideoSrc());
			frameGrabber.start();
			Java2DFrameConverter aa = new Java2DFrameConverter();
			try {
			    BufferedImage bi;
			    Frame f = frameGrabber.grabKeyFrame();
			    bi = aa.convert(f);
			    
			    while (bi!=null) {
			    	video.setThumbnailImgSrc(System.currentTimeMillis() + "_" + video.getOrgVideoSrc() + ".png");
			        ImageIO.write(bi, "png", new File(res.getFile().getCanonicalPath() + "/" + video.getThumbnailImgSrc()));
			        f = frameGrabber.grabKeyFrame();
			        bi = aa.convert(f);
			    }
			    frameGrabber.stop();
			} catch (Exception e) {
			    e.printStackTrace();
			}
		}
	}

}
