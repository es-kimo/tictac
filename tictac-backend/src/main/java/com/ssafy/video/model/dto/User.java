package com.ssafy.video.model.dto;

public class User {

		private String userId;
		private String password;
		private String username;
		
		public User() {}
		
		public User(String userId, String password, String username) {
			super();
			this.userId = userId;
			this.password = password;
			this.username = username;
		}
		

		public String getUserId() {
			return userId;
		}
		public void setUserId(String userId) {
			this.userId = userId;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		
		@Override
		public String toString() {
			return "User [userId=" + userId + ", password=" + password + ", username=" + username + "]";
		}
		
}
