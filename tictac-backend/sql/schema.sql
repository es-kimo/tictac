-- DROP TABLE category;
SELECT * FROM user;
SELECT * FROM video;
SELECT * FROM mybookmarklist;
SELECT * FROM comment;

-- user 테이블에 데이터 써줌
INSERT INTO user (userId, password, username, email)
VALUES ("ssafy", "1234", "김싸피", "ssafy@ssafy.com"),
("ssafy2", "5678", "김싸피2", "ssafy2@ssafy.com");

-- video 테이블에 데이터 써줌
INSERT INTO video (videoId, User_userId, content, videoSrc, regDate, heartCnt, bookmarkCnt, viewCnt, thumbnailImgSrc, categoryId)
VALUES (10000, "ssafy", "파쿠르 영상입니다", "", STR_TO_DATE('15-11-2023','%d-%m-%Y'), 0, 0, 0, "", 1), 
(10001, "ssafy2", "스케이트보드 영상입니다", "", STR_TO_DATE('15-11-2023','%d-%m-%Y'), 0, 0, 0, "", 1);

INSERT INTO mybookmarklist (User_userId, Video_videoId)
VALUES ("ssafy", 10000),
("ssafy", 10001);

INSERT INTO comment (Video_videoId, commentId, User_username, content, regDate)
VALUES (10000, 1, "김싸피", "댓글입니다", STR_TO_DATE('15-11-2023','%d-%m-%Y'));
