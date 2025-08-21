@echo off
REM Script to fix Next.js webpack cache issues on Windows
echo Fixing Next.js webpack cache issues...

echo.
echo Stopping all Node.js processes...
taskkill /f /im node.exe 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Node.js processes stopped successfully.
) else (
    echo No Node.js processes found running.
)

echo.
echo Cleaning Next.js cache...
if exist ".next" (
    rd /s /q ".next"
    echo .next directory removed.
) else (
    echo .next directory not found.
)

echo.
echo Cleaning npm cache...
npm cache clean --force

echo.
echo Cache cleanup completed!
echo You can now run "npm run dev" to start your development server.

pause
