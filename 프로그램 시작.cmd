@echo off
:: UTF-8 encoding configuration
chcp 65001 > nul
title 화면설계 프로토타입 시작

echo.
echo =======================================================
echo  화면설계 프로토타입 브라우저를 실행합니다...
echo  공유 가능한 URL: https://leehee4343.github.io/20260620_screen_design_prototype/
echo =======================================================
echo.

:: Open default browser with the GitHub Pages URL
start https://leehee4343.github.io/20260620_screen_design_prototype/

:: Briefly pause to let the user see the URL before exiting
timeout /t 2 > nul
exit
