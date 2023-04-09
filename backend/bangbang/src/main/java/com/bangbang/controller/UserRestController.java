package com.bangbang.controller;


import com.bangbang.dto.sign.SignIn;
import com.bangbang.dto.sign.FindPassword;
import com.bangbang.dto.sign.SignUp;
import com.bangbang.dto.sign.UserDto;
import com.bangbang.service.UserServiceImpl;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.RequestBody;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Api(value="UserRestController-Version 1")
public class UserRestController {

  @Autowired
  private UserServiceImpl userService;

  @GetMapping({"", "/"})
  public String index() {
    return "index";
  }

  @ApiOperation(value = "회원 등록", notes = "회원을 등록합니다.")
  @PostMapping("/users/new")
  public ResponseEntity<?> signUp(@RequestBody SignUp SignUpInfo) throws Exception {
    userService.signUp(SignUpInfo);

    return new ResponseEntity<Object>(new HashMap<String, Object>() {{
      put("result", true);
      put("msg", "회원가입을 성공하였습니다.");
    }}, HttpStatus.OK);

  }

  @ApiOperation(value="로그인", notes = "req_data : [id, pw]")
  @PostMapping("/users/auth")
  public ResponseEntity<?> login(@RequestBody SignIn user) throws Exception {
    Map<String, Object> token = userService.login(user);
    String level = "";

    if (token.get("role").equals("ROLE_USER")) {
      level = "1";
    } else if (token.get("role").equals("ROLE_BROKER")) {
      level = "2";
    } else if (token.get("role").equals("ROLE_ADMIN")) {
      level = "3";
    }
    String finalLevel = level;
    return new ResponseEntity<Object>(new HashMap<String, Object>() {{
      put("result", true);
      put("msg", "로그인을 성공하였습니다.");
      put("level", finalLevel);
      put("accesstoken", token.get("access-token"));
      put("refreshtoken", token.get("refresh-token"));
      put("nickname", token.get("nickname"));
      put("email", token.get("email"));
      put("id", token.get("id"));
      put("role", token.get("role"));

    }}, HttpStatus.OK);
  }


  @ApiOperation(value = "Access Token 재발급", notes = "만료된 access token을 재발급받는다.")
  @PostMapping("/user/users/refresh")
  public ResponseEntity<?> refreshToken(HttpServletRequest request) throws Exception {
    HttpStatus status = HttpStatus.ACCEPTED;
    String token = request.getHeader("X-AUTH-TOKEN").substring(7);
    Long uid = userService.findUserId(token);
    String result = userService.refreshToken(uid, token);
    if (result != null && !result.equals("")) {
      // 발급 성공
      return new ResponseEntity<Object>(new HashMap<String, Object>() {{
        put("result", true);
        put("msg", "토큰이 발급되었습니다.");
        put("accesstoken", result);
      }}, status);
    } else {
      // 발급 실패
      throw new RuntimeException("리프레시 토큰 발급에 실패하였습니다.");
    }
  }

  @ApiOperation(value = "비밀번호 찾기", notes = "회원의 임시 비밀번호를 메일로 전송합니다.")
  @PostMapping("/users/find/password")
  public ResponseEntity<?> findPassword(@RequestBody FindPassword findPasswordEmail) throws Exception {
    userService.findPassword(findPasswordEmail);
    return new ResponseEntity<Object>(new HashMap<String, Object>() {{
      put("result", true);
      put("msg", "이메일로 임시 비밀번호를 발급하였습니다.");
    }}, HttpStatus.OK);
  }

  @ApiOperation(value = "모든 유저 조회", notes = "관리자 페이지에서 모든 유저를 조회하는 용도입니다.")
  @PostMapping("/admin/users/all")
  public ResponseEntity<?> findAllUsers(HttpServletRequest request) throws Exception {
    List<UserDto> user = userService.findAllUsers();
    if (user != null && !user.isEmpty())
      return new ResponseEntity<List<UserDto>>(user, HttpStatus.OK);
    return new ResponseEntity(HttpStatus.NO_CONTENT);
  }


}
