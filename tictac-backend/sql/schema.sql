SELECT * FROM user;
SELECT * FROM video;
SELECT * FROM mybookmarklist;
SELECT * FROM comment;

-- user 테이블에 데이터 써줌
INSERT INTO user (userId, password, username, email)
VALUES ("ssafy", "1234", "김싸피", "ssafy@ssafy.com"),
("ssafy2", "5678", "김싸피2", "ssafy2@ssafy.com");

-- video 테이블에 데이터 써줌
INSERT INTO video (User_userId, content, videoSrc, regDate, thumbnailImgSrc, categoryId)
VALUES
("ssafy", "파쿠르 영상입니다", "13f64e4c-aef3-449a-b2ad-24179714f5ef_noeul.mp4", STR_TO_DATE('22-11-2023','%d-%m-%Y'), "13f64e4c-aef3-449a-b2ad-24179714f5ef_noeul.png", "파쿠르"),
("ssafy2", "독 어질리티 영상입니다", "a10fb644-54ad-414e-8c8f-f726bf190dfa_noeul.mp4", STR_TO_DATE('22-11-2023','%d-%m-%Y'), "a10fb644-54ad-414e-8c8f-f726bf190dfa_noeul.png", "독 어질리티");

INSERT INTO mybookmarklist (User_userId, Video_videoId)
VALUES ("ssafy", 10000),
("ssafy", 10001);

INSERT INTO comment (Video_videoId, commentId, User_userId, User_username, content, regDate)
VALUES (10000, 1, "ssafy", "김싸피", "댓글입니다", STR_TO_DATE('15-11-2023','%d-%m-%Y'));