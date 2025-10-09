// Mobile Navigation
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Modal Handling
const modal = document.getElementById('toolModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close-modal');

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Tool Cards Handling
document.addEventListener('DOMContentLoaded', () => {
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('click', () => {
            const tool = card.getAttribute('data-tool');
            openTool(tool);
        });
    });
});

function openTool(tool) {
    modal.style.display = 'block';
    modalContent.innerHTML = getToolContent(tool);
    initializeTool(tool);
}

function initializeTool(tool) {
    switch (tool) {
        case 'colorConverter':
            const colorInput = document.getElementById('colorInput');
            const colorPreview = document.getElementById('colorPreview');
            colorInput.addEventListener('input', () => {
                colorPreview.style.backgroundColor = colorInput.value;
            });
            break;
            
        case 'timeConverter':
            initializeTimeZones();
            break;
            
        case 'currencyConverter':
            initializeCurrencies();
            break;
            
        case 'qrGenerator':
            const qrInput = document.getElementById('qrInput');
            qrInput.addEventListener('input', generateQR);
            break;
            
        case 'markdownEditor':
            const markdownInput = document.getElementById('markdownInput');
            markdownInput.addEventListener('input', () => {
                const preview = document.getElementById('markdownPreview');
                preview.innerHTML = marked(markdownInput.value);
            });
            break;
            
        case 'imageConverter':
            const imageInput = document.getElementById('imageInput');
            imageInput.addEventListener('change', (e) => {
                const preview = document.getElementById('imagePreview');
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        preview.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
            break;

        case 'voiceRecorder':
            const recorder = initVoiceRecorder();
            document.getElementById('startRecord').addEventListener('click', () => {
                recorder.start();
                document.getElementById('startRecord').disabled = true;
                document.getElementById('stopRecord').disabled = false;
            });
            document.getElementById('stopRecord').addEventListener('click', () => {
                recorder.stop();
                document.getElementById('startRecord').disabled = false;
                document.getElementById('stopRecord').disabled = true;
            });
            break;
            
        case 'imageFilter':
            const filterInput = document.getElementById('filterInput');
            const filterType = document.getElementById('filterType');
            const filterCanvas = document.getElementById('filterCanvas');
            const filterResult = document.getElementById('filterResult');
            filterInput.addEventListener('change', () => {
                const file = filterInput.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const img = new Image();
                        img.src = e.target.result;
                        img.onload = () => {
                            const canvas = document.createElement('canvas');
                            canvas.width = img.width;
                            canvas.height = img.height;
                            const ctx = canvas.getContext('2d');
                            ctx.drawImage(img, 0, 0);
                            filterCanvas.width = img.width;
                            filterCanvas.height = img.height;
                            const filterCtx = filterCanvas.getContext('2d');
                            filterCtx.drawImage(canvas, 0, 0);
                            filterResult.textContent = 'Filter applied successfully!';
                        };
                    };
                    reader.readAsDataURL(file);
                }
            });
            filterType.addEventListener('change', () => {
                applyImageFilter();
            });
            break;
            
        case 'textAnalyzer':
            const analyzeInput = document.getElementById('analyzeInput');
            const analyzeResult = document.getElementById('analyzeResult');
            analyzeInput.addEventListener('input', () => {
                analyzeText();
            });
            break;
            
        case 'colorPalette':
            const baseColor = document.getElementById('baseColor');
            const colorScheme = document.getElementById('colorScheme');
            const paletteResult = document.getElementById('paletteResult');
            baseColor.addEventListener('input', () => {
                generateColorPalette();
            });
            colorScheme.addEventListener('change', () => {
                generateColorPalette();
            });
            break;
            
        case 'responsiveChecker':
            const responsiveUrl = document.getElementById('responsiveUrl');
            const responsiveResult = document.getElementById('responsiveResult');
            responsiveUrl.addEventListener('input', () => {
                checkResponsive();
            });
            break;
            
        case 'cssGrid':
            const gridRows = document.getElementById('gridRows');
            const gridCols = document.getElementById('gridCols');
            const gridGap = document.getElementById('gridGap');
            const gridPreview = document.getElementById('gridPreview');
            const gridResult = document.getElementById('gridResult');
            gridRows.addEventListener('input', () => {
                generateCSSGrid();
            });
            gridCols.addEventListener('input', () => {
                generateCSSGrid();
            });
            gridGap.addEventListener('input', () => {
                generateCSSGrid();
            });
            break;
            
        case 'svgWave':
            const waveHeight = document.getElementById('waveHeight');
            const wavePoints = document.getElementById('wavePoints');
            const waveColor = document.getElementById('waveColor');
            const wavePreview = document.getElementById('wavePreview');
            const waveResult = document.getElementById('waveResult');
            waveHeight.addEventListener('input', () => {
                generateWave();
            });
            wavePoints.addEventListener('input', () => {
                generateWave();
            });
            waveColor.addEventListener('input', () => {
                generateWave();
            });
            break;
            
        case 'patternMaker':
            const patternType = document.getElementById('patternType');
            const patternColor1 = document.getElementById('patternColor1');
            const patternColor2 = document.getElementById('patternColor2');
            const patternSize = document.getElementById('patternSize');
            const patternPreview = document.getElementById('patternPreview');
            const patternResult = document.getElementById('patternResult');
            patternType.addEventListener('change', () => {
                generatePattern();
            });
            patternColor1.addEventListener('input', () => {
                generatePattern();
            });
            patternColor2.addEventListener('input', () => {
                generatePattern();
            });
            patternSize.addEventListener('input', () => {
                generatePattern();
            });
            break;
            
        case 'fontPreviewer':
            const fontFamily = document.getElementById('fontFamily');
            const fontSize = document.getElementById('fontSize');
            const fontColor = document.getElementById('fontColor');
            const fontText = document.getElementById('fontText');
            const fontPreview = document.getElementById('fontPreview');
            fontFamily.addEventListener('change', () => {
                previewFont();
            });
            fontSize.addEventListener('input', () => {
                previewFont();
            });
            fontColor.addEventListener('input', () => {
                previewFont();
            });
            fontText.addEventListener('input', () => {
                previewFont();
            });
            break;
            
        case 'pomodoroTimer':
            const workTime = document.getElementById('workTime');
            const breakTime = document.getElementById('breakTime');
            const pomodoroResult = document.getElementById('pomodoroResult');
            workTime.addEventListener('input', () => {
                startWork();
            });
            breakTime.addEventListener('input', () => {
                startBreak();
            });
            break;
            
        case 'kanbanBoard':
            initDragAndDrop();
            loadTasks();
            break;
            
        case 'mindMap':
            initMindMap();
            break;
            
        case 'habitTracker':
            initHabitTracker();
            break;
            
        case 'dataVisualizer':
            const visualData = document.getElementById('visualData');
            const visualType = document.getElementById('visualType');
            const visualResult = document.getElementById('visualResult');
            visualData.addEventListener('input', () => {
                visualizeData();
            });
            visualType.addEventListener('change', () => {
                visualizeData();
            });
            break;
            
        case 'csvAnalyzer':
            const csvInput = document.getElementById('csvInput');
            const csvHeader = document.getElementById('csvHeader');
            const csvStats = document.getElementById('csvStats');
            const csvResult = document.getElementById('csvResult');
            csvInput.addEventListener('change', () => {
                analyzeCSV();
            });
            csvHeader.addEventListener('change', () => {
                analyzeCSV();
            });
            csvStats.addEventListener('change', () => {
                analyzeCSV();
            });
            break;
            
        case 'statCalculator':
            const statsInput = document.getElementById('statsInput');
            const statsResult = document.getElementById('statsResult');
            statsInput.addEventListener('input', () => {
                calculateStats();
            });
            break;
            
        case 'dataFormatter':
            const formatType = document.getElementById('formatType');
            const formatInput = document.getElementById('formatInput');
            const formatResult = document.getElementById('formatResult');
            formatType.addEventListener('change', () => {
                formatData();
            });
            formatInput.addEventListener('input', () => {
                formatData();
            });
            break;
            
        case 'passwordGenerator':
            const passwordLength = document.getElementById('passwordLength');
            const passwordUppercase = document.getElementById('passwordUppercase');
            const passwordLowercase = document.getElementById('passwordLowercase');
            const passwordNumbers = document.getElementById('passwordNumbers');
            const passwordSymbols = document.getElementById('passwordSymbols');
            const passwordResult = document.getElementById('passwordResult');
            passwordLength.addEventListener('input', () => {
                generatePassword();
            });
            passwordUppercase.addEventListener('change', () => {
                generatePassword();
            });
            passwordLowercase.addEventListener('change', () => {
                generatePassword();
            });
            passwordNumbers.addEventListener('change', () => {
                generatePassword();
            });
            passwordSymbols.addEventListener('change', () => {
                generatePassword();
            });
            break;
            
        case 'hashCalculator':
            const hashInput = document.getElementById('hashInput');
            const hashAlgorithm = document.getElementById('hashAlgorithm');
            const hashResult = document.getElementById('hashResult');
            hashInput.addEventListener('input', () => {
                calculateHash();
            });
            hashAlgorithm.addEventListener('change', () => {
                calculateHash();
            });
            break;
            
        case 'encoderDecoder':
            const codecType = document.getElementById('codecType');
            const codecInput = document.getElementById('codecInput');
            const codecResult = document.getElementById('codecResult');
            codecType.addEventListener('change', () => {
                encodeText();
            });
            codecInput.addEventListener('input', () => {
                encodeText();
            });
            break;
            
        case 'passwordStrength':
            const passwordInput = document.getElementById('passwordInput');
            const strengthResult = document.getElementById('strengthResult');
            passwordInput.addEventListener('input', () => {
                checkPasswordStrength();
            });
            break;
            
        default:
            console.error(`Tool ${tool} not found or not initialized`);
    }
}

function getToolContent(tool) {
    switch (tool) {
        case 'colorConverter':
            return `
                <h2>Color Converter</h2>
                <div class="converter-tool">
                    <div class="color-preview" id="colorPreview"></div>
                    <select id="colorFormat" class="tool-input">
                        <option value="hex">HEX</option>
                        <option value="rgb">RGB</option>
                        <option value="hsl">HSL</option>
                    </select>
                    <input type="text" id="colorInput" class="tool-input" placeholder="Enter color value">
                    <button onclick="convertColor()" class="submit-btn">Convert</button>
                    <div id="colorResult" class="tool-output"></div>
                </div>
            `;
            
        case 'timeConverter':
            return `
                <h2>Time Zone Converter</h2>
                <div class="converter-tool">
                    <input type="datetime-local" id="timeInput" class="tool-input">
                    <select id="fromTimezone" class="tool-input"></select>
                    <select id="toTimezone" class="tool-input"></select>
                    <button onclick="convertTime()" class="submit-btn">Convert</button>
                    <div id="timeResult" class="tool-output"></div>
                </div>
            `;
            
        case 'currencyConverter':
            return `
                <h2>Currency Converter</h2>
                <div class="converter-tool">
                    <input type="number" id="currencyAmount" class="tool-input" placeholder="Amount">
                    <select id="fromCurrency" class="tool-input"></select>
                    <select id="toCurrency" class="tool-input"></select>
                    <button onclick="convertCurrency()" class="submit-btn">Convert</button>
                    <div id="currencyResult" class="tool-output"></div>
                </div>
            `;
            
        case 'percentageCalc':
            return `
                <h2>Percentage Calculator</h2>
                <div class="calculator-tool">
                    <select id="percentageType" class="tool-input">
                        <option value="percentage">What is X% of Y?</option>
                        <option value="value">X is what percentage of Y?</option>
                        <option value="increase">Percentage increase/decrease</option>
                    </select>
                    <input type="number" id="percentageX" class="tool-input" placeholder="X value">
                    <input type="number" id="percentageY" class="tool-input" placeholder="Y value">
                    <button onclick="calculatePercentage()" class="submit-btn">Calculate</button>
                    <div id="percentageResult" class="tool-output"></div>
                </div>
            `;
            
        case 'bmiCalculator':
            return `
                <h2>BMI Calculator</h2>
                <div class="calculator-tool">
                    <select id="bmiUnit" class="tool-input">
                        <option value="metric">Metric (kg/m)</option>
                        <option value="imperial">Imperial (lb/in)</option>
                    </select>
                    <input type="number" id="weight" class="tool-input" placeholder="Weight">
                    <input type="number" id="height" class="tool-input" placeholder="Height">
                    <button onclick="calculateBMI()" class="submit-btn">Calculate BMI</button>
                    <div id="bmiResult" class="tool-output"></div>
                </div>
            `;
            
        case 'ageCalculator':
            return `
                <h2>Age Calculator</h2>
                <div class="calculator-tool">
                    <input type="date" id="birthDate" class="tool-input">
                    <input type="date" id="calculateToDate" class="tool-input" value="${new Date().toISOString().split('T')[0]}">
                    <button onclick="calculateAge()" class="submit-btn">Calculate Age</button>
                    <div id="ageResult" class="tool-output"></div>
                </div>
            `;
            
        case 'qrGenerator':
            return `
                <h2>QR Code Generator</h2>
                <div class="generator-tool">
                    <input type="text" id="qrInput" class="tool-input" placeholder="Enter text or URL">
                    <select id="qrSize" class="tool-input">
                        <option value="100">Small (100x100)</option>
                        <option value="200" selected>Medium (200x200)</option>
                        <option value="300">Large (300x300)</option>
                    </select>
                    <button onclick="generateQR()" class="submit-btn">Generate QR Code</button>
                    <div id="qrResult" class="tool-output"></div>
                </div>
            `;
            
        case 'loremGenerator':
            return `
                <h2>Lorem Ipsum Generator</h2>
                <div class="generator-tool">
                    <select id="loremType" class="tool-input">
                        <option value="paragraphs">Paragraphs</option>
                        <option value="sentences">Sentences</option>
                        <option value="words">Words</option>
                    </select>
                    <input type="number" id="loremCount" class="tool-input" value="3" min="1" max="10">
                    <button onclick="generateLorem()" class="submit-btn">Generate Text</button>
                    <div id="loremResult" class="tool-output"></div>
                </div>
            `;
            
        case 'uuidGenerator':
            return `
                <h2>UUID Generator</h2>
                <div class="generator-tool">
                    <select id="uuidVersion" class="tool-input">
                        <option value="4">Version 4 (Random)</option>
                        <option value="1">Version 1 (Time-based)</option>
                    </select>
                    <input type="number" id="uuidCount" class="tool-input" value="1" min="1" max="10">
                    <button onclick="generateUUID()" class="submit-btn">Generate UUID</button>
                    <div id="uuidResult" class="tool-output"></div>
                </div>
            `;
            
        case 'stringFormatter':
            return `
                <h2>String Formatter</h2>
                <div class="tool">
                    <textarea id="stringInput" class="tool-input" placeholder="Enter text to format"></textarea>
                    <select id="formatType" class="tool-input">
                        <option value="uppercase">UPPERCASE</option>
                        <option value="lowercase">lowercase</option>
                        <option value="capitalize">Capitalize Words</option>
                        <option value="camelCase">camelCase</option>
                        <option value="kebabCase">kebab-case</option>
                        <option value="snakeCase">snake_case</option>
                    </select>
                    <button onclick="formatString()" class="submit-btn">Format</button>
                    <div id="stringResult" class="tool-output"></div>
                </div>
            `;
            
        case 'markdownEditor':
            return `
                <h2>Markdown Editor</h2>
                <div class="tool">
                    <div class="editor-container">
                        <textarea id="markdownInput" class="tool-input" placeholder="Enter Markdown text"></textarea>
                        <div id="markdownPreview" class="markdown-preview"></div>
                    </div>
                </div>
            `;
            
        case 'diffChecker':
            return `
                <h2>Text Diff Checker</h2>
                <div class="tool">
                    <div class="diff-view">
                        <textarea id="text1" class="tool-input" placeholder="Original text"></textarea>
                        <textarea id="text2" class="tool-input" placeholder="Modified text"></textarea>
                    </div>
                    <button onclick="checkDiff()" class="submit-btn">Compare</button>
                    <div id="diffResult" class="tool-output"></div>
                </div>
            `;
            
        case 'jsonFormatter':
            return `
                <h2>JSON Formatter</h2>
                <div class="tool">
                    <textarea id="jsonInput" class="tool-input code-editor" placeholder="Enter JSON"></textarea>
                    <div class="button-group">
                        <button onclick="formatJSON()" class="submit-btn">Format</button>
                        <button onclick="minifyJSON()" class="submit-btn">Minify</button>
                    </div>
                    <div id="jsonResult" class="tool-output code-editor"></div>
                </div>
            `;
            
        case 'sqlFormatter':
            return `
                <h2>SQL Formatter</h2>
                <div class="tool">
                    <textarea id="sqlInput" class="tool-input code-editor" placeholder="Enter SQL query"></textarea>
                    <button onclick="formatSQL()" class="submit-btn">Format</button>
                    <div id="sqlResult" class="tool-output code-editor"></div>
                </div>
            `;
            
        case 'regexTester':
            return `
                <h2>Regex Tester</h2>
                <div class="tool">
                    <input type="text" id="regexPattern" class="tool-input" placeholder="Enter regex pattern">
                    <textarea id="regexText" class="tool-input" placeholder="Enter text to test"></textarea>
                    <button onclick="testRegex()" class="submit-btn">Test</button>
                    <div id="regexResult" class="tool-output"></div>
                </div>
            `;
            
        case 'codeMinifier':
            return `
                <h2>Code Minifier</h2>
                <div class="tool">
                    <select id="codeType" class="tool-input">
                        <option value="js">JavaScript</option>
                        <option value="css">CSS</option>
                        <option value="html">HTML</option>
                    </select>
                    <textarea id="codeInput" class="tool-input code-editor" placeholder="Enter code"></textarea>
                    <button onclick="minifyCode()" class="submit-btn">Minify</button>
                    <div id="codeResult" class="tool-output code-editor"></div>
                </div>
            `;
            
        case 'imageConverter':
            return `
                <h2>Image Converter</h2>
                <div class="tool">
                    <input type="file" id="imageInput" class="tool-input" accept="image/*">
                    <select id="imageFormat" class="tool-input">
                        <option value="jpeg">JPEG</option>
                        <option value="png">PNG</option>
                        <option value="webp">WebP</option>
                    </select>
                    <img id="imagePreview" class="image-preview">
                    <button onclick="convertImage()" class="submit-btn">Convert</button>
                    <div id="imageResult" class="tool-output"></div>
                </div>
            `;
            
        case 'textToSpeech':
            return `
                <h2>Text to Speech</h2>
                <div class="tool">
                    <textarea id="textInput" class="tool-input" placeholder="Enter text to convert to speech"></textarea>
                    <select id="voiceSelect" class="tool-input"></select>
                    <button onclick="textToSpeech()" class="submit-btn">Convert to Speech</button>
                    <div id="speechResult" class="tool-output"></div>
                </div>
            `;
            
        case 'imageGenerator':
            return `
                <h2>AI Image Generator</h2>
                <div class="tool">
                    <textarea id="imagePrompt" class="tool-input" placeholder="Describe the image you want to generate"></textarea>
                    <button onclick="generateImage()" class="submit-btn">Generate Image</button>
                    <div id="imageResult" class="tool-output"></div>
                </div>
            `;
            
        case 'codeAssistant':
            return `
                <h2>AI Code Assistant</h2>
                <div class="tool">
                    <textarea id="codeInput" class="tool-input code-editor" placeholder="Enter your code"></textarea>
                    <button onclick="assistCode()" class="submit-btn">Get Assistance</button>
                    <div id="codeResult" class="tool-output code-editor"></div>
                </div>
            `;
            
        case 'cssGenerator':
            return `
                <h2>CSS Generator</h2>
                <div class="tool">
                    <select id="cssType" class="tool-input">
                        <option value="gradient">Gradient</option>
                        <option value="animation">Animation</option>
                        <option value="flexbox">Flexbox</option>
                    </select>
                    <div id="gradientOptions" class="tool-options">
                        <input type="text" id="gradientColors" class="tool-input" placeholder="Colors (comma-separated)">
                        <input type="text" id="gradientDirection" class="tool-input" placeholder="Direction (e.g., to right)">
                    </div>
                    <div id="animationOptions" class="tool-options" style="display: none;">
                        <input type="text" id="animationName" class="tool-input" placeholder="Animation name">
                        <input type="number" id="animationDuration" class="tool-input" placeholder="Duration (seconds)">
                        <select id="animationTiming" class="tool-input">
                            <option value="linear">Linear</option>
                            <option value="ease">Ease</option>
                            <option value="ease-in">Ease In</option>
                            <option value="ease-out">Ease Out</option>
                        </select>
                    </div>
                    <div id="flexboxOptions" class="tool-options" style="display: none;">
                        <select id="flexJustify" class="tool-input">
                            <option value="flex-start">Flex Start</option>
                            <option value="center">Center</option>
                            <option value="flex-end">Flex End</option>
                            <option value="space-between">Space Between</option>
                        </select>
                        <select id="flexAlign" class="tool-input">
                            <option value="stretch">Stretch</option>
                            <option value="center">Center</option>
                            <option value="flex-start">Flex Start</option>
                            <option value="flex-end">Flex End</option>
                        </select>
                        <select id="flexDirection" class="tool-input">
                            <option value="row">Row</option>
                            <option value="column">Column</option>
                            <option value="row-reverse">Row Reverse</option>
                            <option value="column-reverse">Column Reverse</option>
                        </select>
                    </div>
                    <button onclick="generateCSS()" class="submit-btn">Generate CSS</button>
                    <div id="cssResult" class="tool-output code-editor"></div>
                </div>
            `;
            
        case 'apiTester':
            return `
                <h2>API Tester</h2>
                <div class="tool">
                    <input type="text" id="apiUrl" class="tool-input" placeholder="API URL">
                    <select id="apiMethod" class="tool-input">
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                    <textarea id="apiHeaders" class="tool-input" placeholder="Headers (JSON)"></textarea>
                    <textarea id="apiBody" class="tool-input" placeholder="Request Body (JSON)"></textarea>
                    <button onclick="testAPI()" class="submit-btn">Send Request</button>
                    <div id="apiResult" class="tool-output code-editor"></div>
                </div>
            `;
            
        case 'webScraper':
            return `
                <h2>Web Scraper</h2>
                <div class="tool">
                    <input type="url" id="scrapeUrl" class="tool-input" placeholder="Website URL">
                    <input type="text" id="scrapeSelector" class="tool-input" placeholder="CSS Selector">
                    <button onclick="scrapeWeb()" class="submit-btn">Scrape</button>
                    <div id="scrapeResult" class="tool-output"></div>
                </div>
            `;
            
        case 'gradientGenerator':
            return `
                <h2>Gradient Generator</h2>
                <div class="tool">
                    <input type="color" id="gradientColor1" class="tool-input">
                    <input type="color" id="gradientColor2" class="tool-input">
                    <input type="range" id="gradientAngle" class="tool-input" min="0" max="360" value="45">
                    <div id="gradientResult" class="gradient-preview"></div>
                    <button onclick="generateGradient()" class="submit-btn">Generate</button>
                </div>
            `;
            
        case 'svgEditor':
            return `
                <h2>SVG Editor</h2>
                <div class="tool">
                    <textarea id="svgInput" class="tool-input code-editor" placeholder="Enter SVG code"></textarea>
                    <button onclick="editSVG()" class="submit-btn">Update Preview</button>
                    <div id="svgResult" class="tool-output"></div>
                </div>
            `;
            
        case 'videoConverter':
            return `
                <h2>Video Converter</h2>
                <div class="tool">
                    <input type="file" id="videoInput" class="tool-input" accept="video/*">
                    <select id="videoFormat" class="tool-input">
                        <option value="mp4">MP4</option>
                        <option value="webm">WebM</option>
                        <option value="mov">MOV</option>
                    </select>
                    <button onclick="convertVideo()" class="submit-btn">Convert</button>
                    <div id="videoResult" class="tool-output"></div>
                </div>
            `;
            
        case 'taskManager':
            return `
                <h2>Task Manager</h2>
                <div class="tool">
                    <input type="text" id="taskInput" class="tool-input" placeholder="Enter new task">
                    <button onclick="manageTasks()" class="submit-btn">Add Task</button>
                    <div id="taskResult" class="tool-output"></div>
                </div>
            `;
            
        case 'noteTaker':
            return `
                <h2>Smart Note Taker</h2>
                <div class="tool">
                    <textarea id="noteInput" class="tool-input" placeholder="Enter your note (use #tags for organization)"></textarea>
                    <button onclick="takeNotes()" class="submit-btn">Save Note</button>
                    <div id="noteResult" class="tool-output"></div>
                </div>
            `;
            
        case 'timeTracker':
            return `
                <h2>Time Tracker</h2>
                <div class="tool">
                    <input type="text" id="activityInput" class="tool-input" placeholder="Enter activity name">
                    <button onclick="trackTime()" class="submit-btn">Start Tracking</button>
                    <div id="timeResult" class="tool-output"></div>
                </div>
            `;
            
        case 'chartGenerator':
            return `
                <h2>Chart Generator</h2>
                <div class="tool">
                    <textarea id="chartData" class="tool-input" placeholder="Enter chart data (JSON)"></textarea>
                    <select id="chartType" class="tool-input">
                        <option value="bar">Bar Chart</option>
                        <option value="line">Line Chart</option>
                        <option value="pie">Pie Chart</option>
                    </select>
                    <button onclick="generateChart()" class="submit-btn">Generate Chart</button>
                    <div id="chartResult" class="tool-output"></div>
                </div>
            `;
            
        case 'csvEditor':
            return `
                <h2>CSV Editor</h2>
                <div class="tool">
                    <input type="file" id="csvInput" class="tool-input" accept=".csv">
                    <button onclick="editCSV()" class="submit-btn">Load CSV</button>
                    <div id="csvResult" class="tool-output"></div>
                </div>
            `;
            
        case 'dataVisualizer':
            return `
                <h2>Data Visualizer</h2>
                <div class="tool">
                    <textarea id="visualData" class="tool-input" placeholder="Enter data in JSON format"></textarea>
                    <select id="visualType" class="tool-input">
                        <option value="bar">Bar Chart</option>
                        <option value="line">Line Chart</option>
                        <option value="pie">Pie Chart</option>
                        <option value="scatter">Scatter Plot</option>
                    </select>
                    <button onclick="visualizeData()" class="submit-btn">Visualize</button>
                    <div id="visualResult" class="tool-output chart-container"></div>
                </div>
            `;
            
        case 'passwordManager':
            return `
                <h2>Password Manager</h2>
                <div class="tool">
                    <input type="number" id="passwordLength" class="tool-input" value="12" min="8" max="32">
                    <div class="checkbox-group">
                        <label><input type="checkbox" id="passwordUppercase" checked> Uppercase</label>
                        <label><input type="checkbox" id="passwordLowercase" checked> Lowercase</label>
                        <label><input type="checkbox" id="passwordNumbers" checked> Numbers</label>
                        <label><input type="checkbox" id="passwordSymbols" checked> Symbols</label>
                    </div>
                    <button onclick="managePasswords()" class="submit-btn">Generate Password</button>
                    <div id="passwordResult" class="tool-output"></div>
                </div>
            `;
            
        case 'encryptionTool':
            return `
                <h2>Encryption Tool</h2>
                <div class="tool">
                    <textarea id="encryptInput" class="tool-input" placeholder="Enter text to encrypt"></textarea>
                    <select id="encryptAlgorithm" class="tool-input">
                        <option value="aes">AES</option>
                        <option value="des">DES</option>
                        <option value="rc4">RC4</option>
                    </select>
                    <input type="password" id="encryptKey" class="tool-input" placeholder="Encryption key">
                    <button onclick="encryptText()" class="submit-btn">Encrypt</button>
                    <div id="encryptResult" class="tool-output"></div>
                </div>
            `;
            
        case 'hashGenerator':
            return `
                <h2>Hash Generator</h2>
                <div class="tool">
                    <textarea id="hashInput" class="tool-input" placeholder="Enter text to hash"></textarea>
                    <select id="hashAlgorithm" class="tool-input">
                        <option value="md5">MD5</option>
                        <option value="sha1">SHA-1</option>
                        <option value="sha256">SHA-256</option>
                        <option value="sha512">SHA-512</option>
                    </select>
                    <button onclick="generateHash()" class="submit-btn">Generate Hash</button>
                    <div id="hashResult" class="tool-output"></div>
                </div>
            `;
            
        case 'voiceRecorder':
            return `
                <h2>Voice Recorder</h2>
                <div class="tool">
                    <div class="controls">
                        <button id="startRecord" class="submit-btn">Start Recording</button>
                        <button id="stopRecord" class="submit-btn" disabled>Stop Recording</button>
                    </div>
                    <div id="recorderResult" class="tool-output"></div>
                </div>
            `;
            
        case 'imageFilter':
            return `
                <h2>Image Filter</h2>
                <div class="tool">
                    <input type="file" id="filterInput" class="tool-input" accept="image/*">
                    <select id="filterType" class="tool-input">
                        <option value="grayscale">Grayscale</option>
                        <option value="sepia">Sepia</option>
                        <option value="invert">Invert</option>
                        <option value="blur">Blur</option>
                        <option value="sharpen">Sharpen</option>
                    </select>
                    <button onclick="applyImageFilter()" class="submit-btn">Apply Filter</button>
                    <canvas id="filterCanvas" style="display: none;"></canvas>
                    <div id="filterResult" class="tool-output"></div>
                </div>
            `;
            
        case 'textAnalyzer':
            return `
                <h2>Text Analyzer</h2>
                <div class="tool">
                    <textarea id="analyzeInput" class="tool-input" placeholder="Enter text to analyze"></textarea>
                    <button onclick="analyzeText()" class="submit-btn">Analyze Text</button>
                    <div id="analyzeResult" class="tool-output"></div>
                </div>
            `;
            
        case 'colorPalette':
            return `
                <h2>Color Palette Generator</h2>
                <div class="tool">
                    <input type="color" id="baseColor" class="tool-input" value="#4a90e2">
                    <select id="colorScheme" class="tool-input">
                        <option value="monochromatic">Monochromatic</option>
                        <option value="complementary">Complementary</option>
                        <option value="triadic">Triadic</option>
                        <option value="analogous">Analogous</option>
                        <option value="split">Split Complementary</option>
                    </select>
                    <button onclick="generateColorPalette()" class="submit-btn">Generate Palette</button>
                    <div id="paletteResult" class="tool-output color-grid"></div>
                </div>
            `;
            
        case 'responsiveChecker':
            return `
                <h2>Responsive Checker</h2>
                <div class="tool">
                    <input type="url" id="responsiveUrl" class="tool-input" placeholder="Enter website URL">
                    <div class="device-buttons">
                        <button onclick="checkResponsive('mobile')" class="device-btn">Mobile</button>
                        <button onclick="checkResponsive('tablet')" class="device-btn">Tablet</button>
                        <button onclick="checkResponsive('desktop')" class="device-btn">Desktop</button>
                    </div>
                    <div id="responsiveResult" class="tool-output responsive-frame"></div>
                </div>
            `;
            
        case 'cssGrid':
            return `
                <h2>CSS Grid Generator</h2>
                <div class="tool">
                    <div class="grid-controls">
                        <input type="number" id="gridRows" class="tool-input" value="3" min="1" max="12" placeholder="Rows">
                        <input type="number" id="gridCols" class="tool-input" value="3" min="1" max="12" placeholder="Columns">
                        <input type="number" id="gridGap" class="tool-input" value="10" min="0" max="50" placeholder="Gap (px)">
                    </div>
                    <button onclick="generateCSSGrid()" class="submit-btn">Generate Grid</button>
                    <div id="gridPreview" class="grid-preview"></div>
                    <pre id="gridResult" class="tool-output code-editor"></pre>
                </div>
            `;
            
        case 'svgWave':
            return `
                <h2>SVG Wave Generator</h2>
                <div class="tool">
                    <div class="wave-controls">
                        <input type="range" id="waveHeight" class="tool-input" min="10" max="200" value="50">
                        <input type="range" id="wavePoints" class="tool-input" min="3" max="10" value="5">
                        <input type="color" id="waveColor" class="tool-input" value="#4a90e2">
                    </div>
                    <button onclick="generateWave()" class="submit-btn">Generate Wave</button>
                    <div id="wavePreview" class="wave-preview"></div>
                    <pre id="waveResult" class="tool-output code-editor"></pre>
                </div>
            `;
            
        case 'patternMaker':
            return `
                <h2>Pattern Maker</h2>
                <div class="tool">
                    <div class="pattern-controls">
                        <select id="patternType" class="tool-input">
                            <option value="dots">Dots</option>
                            <option value="lines">Lines</option>
                            <option value="squares">Squares</option>
                            <option value="triangles">Triangles</option>
                        </select>
                        <input type="color" id="patternColor1" class="tool-input" value="#4a90e2">
                        <input type="color" id="patternColor2" class="tool-input" value="#ffffff">
                        <input type="range" id="patternSize" class="tool-input" min="10" max="100" value="30">
                    </div>
                    <button onclick="generatePattern()" class="submit-btn">Generate Pattern</button>
                    <div id="patternPreview" class="pattern-preview"></div>
                    <pre id="patternResult" class="tool-output code-editor"></pre>
                </div>
            `;
            
        case 'fontPreviewer':
            return `
                <h2>Font Previewer</h2>
                <div class="tool">
                    <div class="font-controls">
                        <select id="fontFamily" class="tool-input">
                            <option value="Arial">Arial</option>
                            <option value="Helvetica">Helvetica</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Verdana">Verdana</option>
                            <option value="Roboto">Roboto</option>
                        </select>
                        <input type="range" id="fontSize" class="tool-input" min="12" max="72" value="24">
                        <input type="color" id="fontColor" class="tool-input" value="#000000">
                    </div>
                    <textarea id="fontText" class="tool-input" placeholder="Enter text to preview">The quick brown fox jumps over the lazy dog</textarea>
                    <button onclick="previewFont()" class="submit-btn">Preview Font</button>
                    <div id="fontPreview" class="font-preview tool-output"></div>
                </div>
            `;
            
        case 'pomodoroTimer':
            return `
                <h2>Pomodoro Timer</h2>
                <div class="tool">
                    <div class="timer-controls">
                        <input type="number" id="workTime" class="tool-input" value="25" min="1" max="60" placeholder="Work Time (minutes)">
                        <input type="number" id="breakTime" class="tool-input" value="5" min="1" max="30" placeholder="Break Time (minutes)">
                    </div>
                    <div class="timer-buttons">
                        <button onclick="startWork()" class="submit-btn">Start Work</button>
                        <button onclick="startBreak()" class="submit-btn">Start Break</button>
                        <button onclick="stopTimer()" class="submit-btn">Stop</button>
                    </div>
                    <div id="pomodoroResult" class="tool-output timer-display">25:00</div>
                </div>
            `;
            
        case 'kanbanBoard':
            return `
                <h2>Kanban Board</h2>
                <div class="tool">
                    <div class="kanban-input">
                        <input type="text" id="taskInput" class="tool-input" placeholder="Enter task">
                        <select id="taskColumn" class="tool-input">
                            <option value="todo">To Do</option>
                            <option value="inProgress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                        <button onclick="addTask()" class="submit-btn">Add Task</button>
                    </div>
                    <div class="kanban-board">
                        <div class="kanban-column" id="todo">
                            <h3>To Do</h3>
                            <div class="task-list"></div>
                        </div>
                        <div class="kanban-column" id="inProgress">
                            <h3>In Progress</h3>
                            <div class="task-list"></div>
                        </div>
                        <div class="kanban-column" id="done">
                            <h3>Done</h3>
                            <div class="task-list"></div>
                        </div>
                    </div>
                </div>
            `;
            
        case 'mindMap':
            return `
                <h2>Mind Map Creator</h2>
                <div class="tool">
                    <div class="mindmap-controls">
                        <input type="text" id="nodeText" class="tool-input" placeholder="Enter node text">
                        <button onclick="addNode()" class="submit-btn">Add Node</button>
                        <button onclick="addChild()" class="submit-btn">Add Child</button>
                        <button onclick="deleteNode()" class="submit-btn">Delete Node</button>
                    </div>
                    <div id="mindmapCanvas" class="mindmap-canvas tool-output"></div>
                </div>
            `;
            
        case 'habitTracker':
            return `
                <h2>Habit Tracker</h2>
                <div class="tool">
                    <div class="habit-input">
                        <input type="text" id="habitName" class="tool-input" placeholder="Enter habit name">
                        <button onclick="addHabit()" class="submit-btn">Add Habit</button>
                    </div>
                    <div id="habitList" class="habit-list tool-output">
                        <div class="habit-header">
                            <span>Habit</span>
                            <div class="day-headers"></div>
                        </div>
                        <div class="habit-items"></div>
                    </div>
                </div>
            `;
            
        case 'csvAnalyzer':
            return `
                <h2>CSV Analyzer</h2>
                <div class="tool">
                    <input type="file" id="csvInput" class="tool-input" accept=".csv">
                    <div class="analyze-options">
                        <label><input type="checkbox" id="csvHeader" checked> Has Header Row</label>
                        <label><input type="checkbox" id="csvStats" checked> Show Statistics</label>
                    </div>
                    <button onclick="analyzeCSV()" class="submit-btn">Analyze</button>
                    <div id="csvResult" class="tool-output">
                        <div class="csv-table"></div>
                        <div class="csv-stats"></div>
                    </div>
                </div>
            `;
            
        case 'statCalculator':
            return `
                <h2>Statistical Calculator</h2>
                <div class="tool">
                    <textarea id="statsInput" class="tool-input" placeholder="Enter numbers (comma or space separated)"></textarea>
                    <button onclick="calculateStats()" class="submit-btn">Calculate</button>
                    <div id="statsResult" class="tool-output stats-grid"></div>
                </div>
            `;
            
        case 'dataFormatter':
            return `
                <h2>Data Formatter</h2>
                <div class="tool">
                    <select id="formatType" class="tool-input">
                        <option value="json">JSON</option>
                        <option value="xml">XML</option>
                        <option value="csv">CSV</option>
                    </select>
                    <textarea id="formatInput" class="tool-input code-editor" placeholder="Enter data to format"></textarea>
                    <div class="format-options">
                        <button onclick="formatData()" class="submit-btn">Format</button>
                        <button onclick="minifyData()" class="submit-btn">Minify</button>
                        <button onclick="validateData()" class="submit-btn">Validate</button>
                    </div>
                    <pre id="formatResult" class="tool-output code-editor"></pre>
                </div>
            `;
            
        case 'passwordGenerator':
            return `
                <h2>Password Generator</h2>
                <div class="tool">
                    <div class="password-options">
                        <input type="number" id="passwordLength" class="tool-input" value="12" min="8" max="64">
                        <div class="checkbox-group">
                            <label><input type="checkbox" id="passwordUppercase" checked> Uppercase</label>
                            <label><input type="checkbox" id="passwordLowercase" checked> Lowercase</label>
                            <label><input type="checkbox" id="passwordNumbers" checked> Numbers</label>
                            <label><input type="checkbox" id="passwordSymbols" checked> Symbols</label>
                        </div>
                    </div>
                    <button onclick="generatePassword()" class="submit-btn">Generate</button>
                    <div id="passwordResult" class="tool-output password-display"></div>
                </div>
            `;
            
        case 'hashCalculator':
            return `
                <h2>Hash Calculator</h2>
                <div class="tool">
                    <textarea id="hashInput" class="tool-input" placeholder="Enter text to hash"></textarea>
                    <select id="hashAlgorithm" class="tool-input">
                        <option value="md5">MD5</option>
                        <option value="sha1">SHA-1</option>
                        <option value="sha256">SHA-256</option>
                        <option value="sha512">SHA-512</option>
                    </select>
                    <button onclick="calculateHash()" class="submit-btn">Calculate Hash</button>
                    <div id="hashResult" class="tool-output hash-display"></div>
                </div>
            `;
            
        case 'encoderDecoder':
            return `
                <h2>Encoder/Decoder</h2>
                <div class="tool">
                    <select id="codecType" class="tool-input">
                        <option value="base64">Base64</option>
                        <option value="url">URL</option>
                        <option value="html">HTML</option>
                        <option value="jwt">JWT</option>
                    </select>
                    <textarea id="codecInput" class="tool-input" placeholder="Enter text to encode/decode"></textarea>
                    <div class="codec-buttons">
                        <button onclick="encodeText()" class="submit-btn">Encode</button>
                        <button onclick="decodeText()" class="submit-btn">Decode</button>
                    </div>
                    <div id="codecResult" class="tool-output"></div>
                </div>
            `;
            
        case 'passwordStrength':
            return `
                <h2>Password Strength Checker</h2>
                <div class="tool">
                    <input type="password" id="passwordInput" class="tool-input" placeholder="Enter password to check">
                    <button onclick="checkPasswordStrength()" class="submit-btn">Check Strength</button>
                    <div id="strengthResult" class="tool-output strength-meter"></div>
                </div>
            `;
            
        default:
            return '<h2>Tool not found</h2>';
    }
}

// Tool-specific functions
function convertColor() {
    const input = document.getElementById('colorInput').value;
    const format = document.getElementById('colorFormat').value;
    const preview = document.getElementById('colorPreview');
    const result = document.getElementById('colorResult');
    
    // Add color conversion logic here
}

function convertTime() {
    const input = document.getElementById('timeInput').value;
    const fromTZ = document.getElementById('fromTimezone').value;
    const toTZ = document.getElementById('toTimezone').value;
    const result = document.getElementById('timeResult');
    
    // Add time conversion logic here
}

function convertCurrency() {
    const amount = document.getElementById('currencyAmount').value;
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
    const result = document.getElementById('currencyResult');
    
    // Add currency conversion logic here
}

function calculatePercentage() {
    const type = document.getElementById('percentageType').value;
    const x = parseFloat(document.getElementById('percentageX').value);
    const y = parseFloat(document.getElementById('percentageY').value);
    const result = document.getElementById('percentageResult');
    
    // Add percentage calculation logic here
}

function calculateBMI() {
    const unit = document.getElementById('bmiUnit').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const result = document.getElementById('bmiResult');
    
    // Add BMI calculation logic here
}

function calculateAge() {
    const birthDate = new Date(document.getElementById('birthDate').value);
    const calculateTo = new Date(document.getElementById('calculateToDate').value);
    const result = document.getElementById('ageResult');
    
    // Add age calculation logic here
}

function generateQR() {
    const input = document.getElementById('qrInput').value;
    const size = document.getElementById('qrSize').value;
    const result = document.getElementById('qrResult');
    
    // Add QR code generation logic here
}

function generateLorem() {
    const type = document.getElementById('loremType').value;
    const count = document.getElementById('loremCount').value;
    const result = document.getElementById('loremResult');
    
    // Add Lorem Ipsum generation logic here
}

function generateUUID() {
    const version = document.getElementById('uuidVersion').value;
    const count = document.getElementById('uuidCount').value;
    const result = document.getElementById('uuidResult');
    
    // Add UUID generation logic here
}

function formatString() {
    const input = document.getElementById('stringInput').value;
    const type = document.getElementById('formatType').value;
    const result = document.getElementById('stringResult');
    
    // Add string formatting logic here
}

function checkDiff() {
    const text1 = document.getElementById('text1').value;
    const text2 = document.getElementById('text2').value;
    const result = document.getElementById('diffResult');
    
    // Add text diff logic here
}

function formatJSON() {
    const input = document.getElementById('jsonInput').value;
    const result = document.getElementById('jsonResult');
    
    try {
        const formatted = JSON.stringify(JSON.parse(input), null, 2);
        result.textContent = formatted;
    } catch (error) {
        result.textContent = 'Invalid JSON';
    }
}

function minifyJSON() {
    const input = document.getElementById('jsonInput').value;
    const result = document.getElementById('jsonResult');
    
    try {
        const minified = JSON.stringify(JSON.parse(input));
        result.textContent = minified;
    } catch (error) {
        result.textContent = 'Invalid JSON';
    }
}

function formatSQL() {
    const input = document.getElementById('sqlInput').value;
    const result = document.getElementById('sqlResult');
    
    // Add SQL formatting logic here
}

function testRegex() {
    const pattern = document.getElementById('regexPattern').value;
    const text = document.getElementById('regexText').value;
    const result = document.getElementById('regexResult');
    
    // Add regex testing logic here
}

function minifyCode() {
    const type = document.getElementById('codeType').value;
    const input = document.getElementById('codeInput').value;
    const result = document.getElementById('codeResult');
    
    // Add code minification logic here
}

// Contact Form Handling
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send this data to a server
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
}); 