const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Mockup data
const gameData = {
  title: 'LNWSING',
  gameName: 'เกมนักสืบ',
  leaderboard: [
    {
      rank: 1,
      name: 'สมชาย',
      score: 2500,
      cases_solved: 15,
      badge: 'master-detective',
      avatar: '/images/avatars/detective1.png'
    },
    {
      rank: 2,
      name: 'สมหญิง',
      score: 2100,
      cases_solved: 12,
      badge: 'senior-detective',
      avatar: '/images/avatars/detective2.png'
    },
    {
      rank: 3,
      name: 'สมศรี',
      score: 1800,
      cases_solved: 10,
      badge: 'detective',
      avatar: '/images/avatars/detective3.png'
    },
    {
      rank: 4,
      name: 'สมพงษ์',
      score: 1500,
      cases_solved: 8,
      badge: 'junior-detective',
      avatar: '/images/avatars/detective4.png'
    },
    {
      rank: 5,
      name: 'สมปอง',
      score: 1200,
      cases_solved: 6,
      badge: 'rookie',
      avatar: '/images/avatars/detective5.png'
    }
  ],
  badges: {
    'master-detective': {
      name: 'นักสืบระดับตำนาน',
      color: 'warning',
      icon: 'bi-trophy-fill'
    },
    'senior-detective': {
      name: 'นักสืบอาวุโส',
      color: 'secondary',
      icon: 'bi-shield-fill-check'
    },
    'detective': {
      name: 'นักสืบ',
      color: 'bronze',
      icon: 'bi-shield-fill'
    },
    'junior-detective': {
      name: 'นักสืบมือใหม่',
      color: 'info',
      icon: 'bi-shield'
    },
    'rookie': {
      name: 'มือใหม่หัดไข',
      color: 'light',
      icon: 'bi-person-badge'
    }
  },
  cases: [
    {
      id: 1,
      name: 'คดีปริศนาในคฤหาสน์ร้าง',
      difficulty: 'easy',
      points: 100,
      time_limit: 30,
      status: 'available'
    },
    {
      id: 2,
      name: 'ความลับของพิพิธภัณฑ์',
      difficulty: 'medium',
      points: 200,
      time_limit: 45,
      status: 'available'
    },
    {
      id: 3,
      name: 'ปริศนาเงาในค่ำคืน',
      difficulty: 'hard',
      points: 300,
      time_limit: 60,
      status: 'locked'
    }
  ],
  difficulty_levels: {
    easy: {
      name: 'ระดับง่าย',
      color: 'success',
      min_score: 0
    },
    medium: {
      name: 'ระดับกลาง',
      color: 'warning',
      min_score: 500
    },
    hard: {
      name: 'ระดับยาก',
      color: 'danger',
      min_score: 1000
    }
  }
};

// Middleware setup
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: gameData.title,
    gameName: gameData.gameName,
    leaderboard: gameData.leaderboard,
    badges: gameData.badges
  });
});

// API Routes
app.get('/api/leaderboard', (req, res) => {
  res.json(gameData.leaderboard);
});

app.get('/api/cases', (req, res) => {
  res.json(gameData.cases);
});

app.get('/api/badges', (req, res) => {
  res.json(gameData.badges);
});

app.get('/api/difficulty-levels', (req, res) => {
  res.json(gameData.difficulty_levels);
});

// Character selection page
app.get('/character', (req, res) => {
  res.render('character', {
    title: gameData.title,
    cases: gameData.cases,
    difficulty_levels: gameData.difficulty_levels
  });
});

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).render('404', {
    title: gameData.title,
    message: 'ไม่พบหน้าที่คุณต้องการ'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    title: gameData.title,
    message: 'เกิดข้อผิดพลาดบางอย่าง'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Application is running on http://localhost:${PORT}`);
});