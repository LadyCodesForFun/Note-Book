// Load existing tasks on page load
window.onload = () => {
  loadTasks();
};

function addTask() {
  const input = document.getElementById('taskInput');
  const urgency = document.getElementById('urgency').value;
  const taskText = input.value.trim();
  if (taskText) {
    const task = { text: taskText, urgency: urgency, done: false };
    saveTask(task);
    displayTask(task);
    input.value = '';
  }
}

const prayers = [
  "اللهم اجعل لي من أمري فرجًا ومخرجًا ",
  "ربي إني مسني الضر وأنت أرحم الراحمين ",
  "لا تحمل همًا، فربك يقول كن فيكون ",
  "Take a deep breath. You’re doing better than you think 💜",
  "May your heart find peace even in chaos. ",
  "ربِّ لا تذرني فردًا وأنت خير الوارثين ",
  "اللهم إني وكلتك أمري، فأنت لي خير وكيل",
  "اللهم طمئن قلبي، وحقق أملي، وبلّغني ما أتمنى",
  "اللهم إنك عفو كريم تحب العفو فاعفُ عني",
  "يا حي يا قيوم برحمتك أستغيث، أصلح لي شأني كله",
  "اللهم اجعل هذا اليوم فرحًا وسعادة وسكينة لقلبي",
  "You’re allowed to rest. Healing is still progress",
  "اللهم إني أعوذ بك من الهم والحزن، والعجز والكسل، والبخل والجبن، وضلع الدين وغلبة الرجال.",
  "لا إله إلا أنت سبحانك إني كنت من الظالمين.",
  "اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً.",
  "اللهم ارزقني الرضا والقناعة، واجعلني من الشاكرين لنعمك.",
  "اللهم إني أسألك الثبات في الأمر، والعزيمة على الرشد، وأسألك شكر نعمتك، وحسن عبادتك.",
  "اللهم إني أسألك خير المسألة وخير الدعاء وخير العمل وخير الثواب.",
  "اللهم إني أعوذ بك من زوال نعمتك، وتحول عافيتك، وفجاءة نقمتك، وجميع سخطك.",
  "اللهم إني أسألك الجنة وما قرب إليها من قول وعمل، وأعوذ بك من النار وما قرب إليها من قول وعمل.",
  "اللهم اجعلني من عبادك الصالحين المخلصين.",
  "You don’t have to do everything today. Just something",
  "Progress isn’t always loud. Sometimes it’s quiet persistence",
  "You are not behind. You’re on your path",
  "Your worth isn’t measured by productivity 🔋",
  "Even slow growth is growth. Water the roots",
  "Gentle with yourself. You're learning, not failing 🫶",
  "Your dreams are valid. Even the soft ones",
  "Don’t forget: you’ve survived 100% of your hard days 🌙",
  "Create a life you don’t need a vacation from",
];

function showPrayer() {
  const randomIndex = Math.floor(Math.random() * prayers.length);
  document.getElementById('prayerText').textContent = prayers[randomIndex];
}

// Save task to local storage
function saveTask(task){
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load all tasks
function loadTasks() {
  const tasks=JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.forEach(displayTask);
}


// Display task in UI
function displayTask(task){
  const taskList = document.getElementById('taskList');

  const li = document.createElement('li');
  li.className = `task ${task.urgency}${task.done ? ' done' : ''}`;
  li.innerHTML = `
  <span>${formatUrgency (task.urgency)}${task.text}</span>
  <div class ="task-buttons">
  <button onclick="markDone(this)">✅</button>
  <button onclick="deleteTask(this)">🗑️</button>
  </div>
  `;
  taskList.appendChild(li);
}

// format urgency into emoji
function formatUrgency(level) {
  switch (level) {
    case "high": return "🔴"
    case "medium": return "🟡"
    case "low": return"🔵"
    default: return "";
  }
}

//mark task as done
function markDone(btn){
  const li = btn.closest("li");
  li.classList.toggle("done");
  updateStorage();
}

//delete task
function deleteTask(btn){
  const li = btn.closest("li");
  li.remove();
  updateStorage();
}

//update local storage after changes
function updateStorage (){
  const taskElement = document.querySelectorAll('#taskList .task');
  const updatedTask =[];

  taskElement.forEach(el => {
    const text = el.querySelector('span').textContent.trim().slice(2); // remove emoji
    const urgency = el.classList.contains("high") ? "high"
    : el.classList.contains("medium") ? "medium"
    :"low";

  const done = el.classList.contains("done");

  updatedTask.push({text, urgency,done});
  });

  localStorage.setItem("tasks", JSON.stringify(updatedTask));
}

