@echo off
echo Pushing to GitHub...
git push -u origin main
if %ERRORLEVEL% equ 0 (
    echo Push successful!
) else (
    echo Push failed. Please check the error message above.
)
pause
