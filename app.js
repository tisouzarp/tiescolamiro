/* ============================================================
   TI - ESCOLA MIRÓ | Sistema de Chamados e Reservas
   Responsável: Tiago Souza
   ============================================================ */

// ===== STATE =====
const STATE = {
  currentUser: null,
  currentPage: 'dashboard',
  notifications: [],
  users: [
    { id: 1, nome: 'Tiago Souza', email: 'tiago@escolamiro.com.br', usuario: 'tiago.souza', role: 'admin', status: 'ativo', criado: '2024-01-15' },
    { id: 2, nome: 'Ana Paula Silva', email: 'ana@escolamiro.com.br', usuario: 'ana.silva', role: 'usuario', status: 'ativo', criado: '2024-02-10' },
    { id: 3, nome: 'Carlos Mendes', email: 'carlos@escolamiro.com.br', usuario: 'carlos.mendes', role: 'usuario', status: 'ativo', criado: '2024-03-05' },
  ],
  equipamentos: [
    { id: 1, nome: 'Notebook Dell Inspiron 15', tipo: 'Notebook', patrimonio: 'NB-001', status: 'disponivel', descricao: '16GB RAM, SSD 512GB' },
    { id: 2, nome: 'Notebook Lenovo ThinkPad', tipo: 'Notebook', patrimonio: 'NB-002', status: 'reservado', descricao: 'Intel Core i5, 8GB RAM' },
    { id: 3, nome: 'iPad Pro 12.9"', tipo: 'iPad', patrimonio: 'IP-001', status: 'disponivel', descricao: 'Wi-Fi, 256GB, iPadOS 17' },
    { id: 4, nome: 'iPad Air 5ª Geração', tipo: 'iPad', patrimonio: 'IP-002', status: 'manutencao', descricao: 'Wi-Fi, 64GB' },
    { id: 5, nome: 'Projetor Epson S41', tipo: 'Projetor', patrimonio: 'PJ-001', status: 'disponivel', descricao: '3300 Lumens, HDMI/VGA' },
    { id: 6, nome: 'Caixa de Som JBL', tipo: 'Caixa de Som', patrimonio: 'CS-001', status: 'disponivel', descricao: 'Bluetooth, 30W' },
  ],
  reservas: [
    { id: 1, equipamentoTipo: 'Notebook', equipamento: 'Notebook Dell Inspiron 15', solicitante: 'Ana Paula Silva', cargo: 'Professor(a)', sala: '3º Ano', dataInicio: '2025-06-02', horaInicio: '08:00', horaFim: '12:00', quantidade: 1, status: 'ativo', criado: '2025-06-01' },
    { id: 2, equipamentoTipo: 'iPad', equipamento: 'iPad Pro 12.9"', solicitante: 'Carlos Mendes', cargo: 'Coordenador(a)', sala: '5º Ano', dataInicio: '2025-06-02', horaInicio: '13:00', horaFim: '17:00', quantidade: 3, status: 'ativo', criado: '2025-06-01' },
    { id: 3, equipamentoTipo: 'Projetor', equipamento: 'Projetor Epson S41', solicitante: 'Ana Paula Silva', cargo: 'Professor(a)', sala: '1º Ano EM', dataInicio: '2025-06-01', horaInicio: '09:00', horaFim: '11:00', quantidade: 1, status: 'fechado', criado: '2025-05-31' },
  ],
  chamados: [
    { id: 1, titulo: 'Notebook sem áudio', descricao: 'O notebook da sala 3 não está produzindo som nas aulas.', categoria: 'Hardware', prioridade: 'Media', solicitante: 'Ana Paula Silva', atribuido: 'Tiago Souza', status: 'andamento', criado: '2025-06-01', atualizado: '2025-06-02' },
    { id: 2, titulo: 'Impressora offline', descricao: 'A impressora da secretaria parou de funcionar.', categoria: 'Hardware', prioridade: 'Alta', solicitante: 'Carlos Mendes', atribuido: 'Tiago Souza', status: 'aberto', criado: '2025-06-02', atualizado: '2025-06-02' },
    { id: 3, titulo: 'Acesso ao Wi-Fi negado', descricao: 'Professores não conseguem acessar a rede Wi-Fi da escola.', categoria: 'Rede', prioridade: 'Alta', solicitante: 'Ana Paula Silva', atribuido: '', status: 'aberto', criado: '2025-06-02', atualizado: '2025-06-02' },
    { id: 4, titulo: 'Instalação de software', descricao: 'Preciso do LibreOffice instalado no laboratório.', categoria: 'Software', prioridade: 'Baixa', solicitante: 'Carlos Mendes', atribuido: 'Tiago Souza', status: 'fechado', criado: '2025-05-28', atualizado: '2025-05-30' },
  ],
  nextId: { reserva: 4, chamado: 5, usuario: 4, equipamento: 7 },
};

// ===== HELPERS =====
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function initials(nome) {
  return nome.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
}

function dateNow() {
  return new Date().toISOString().split('T')[0];
}

function formatDate(d) {
  if (!d) return '-';
  const [y, m, day] = d.split('-');
  return `${day}/${m}/${y}`;
}

function toast(msg, type = 'success') {
  const icons = { success: 'ti-circle-check', error: 'ti-alert-circle', info: 'ti-info-circle', warning: 'ti-alert-triangle' };
  const tc = $('#toast-container') || (() => {
    const el = document.createElement('div');
    el.id = 'toast-container';
    el.className = 'toast-container';
    document.body.appendChild(el);
    return el;
  })();
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<i class="ti ${icons[type]} toast-icon"></i><span class="toast-msg">${msg}</span>`;
  tc.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

function openModal(html, id = 'main-modal') {
  let overlay = $(`#${id}`);
  if (overlay) overlay.remove();
  overlay = document.createElement('div');
  overlay.id = id;
  overlay.className = 'modal-overlay';
  overlay.innerHTML = html;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(id); });
}

function closeModal(id = 'main-modal') {
  const el = $(`#${id}`);
  if (el) el.remove();
}

// ===== RENDER ENGINE =====
function render() {
  const app = $('#app');
  if (!STATE.currentUser) {
    app.innerHTML = renderAuth();
    attachAuthEvents();
  } else {
    app.innerHTML = renderLayout();
    attachLayoutEvents();
    renderPage(STATE.currentPage);
    updateNotifBadge();
  }
}

// ===== AUTH =====
function renderAuth() {
  return `
  <div class="auth-wrapper">
    <div class="auth-card">
      <div class="auth-logo">
        <div class="auth-logo-img"><img src="logo.svg" alt="Logo Escola Miró" style="width:56px;height:56px;object-fit:contain" onerror="this.style.display='none';this.parentElement.innerHTML='<i class=\'ti ti-device-desktop\'></i>'"></div>
        <h1>TI — Escola Miró</h1>
        <p>Sistema de Chamados e Reservas</p>
      </div>
      <div class="auth-tabs">
        <button class="auth-tab active" data-tab="login">Entrar</button>
        <button class="auth-tab" data-tab="register">Cadastrar-se</button>
      </div>

      <!-- LOGIN -->
      <div id="tab-login">
        <div class="form-group">
          <label>Usuário ou E-mail</label>
          <div class="input-icon">
            <i class="ti ti-user"></i>
            <input id="login-user" type="text" placeholder="seu.usuario" />
          </div>
        </div>
        <div class="form-group">
          <label>Senha</label>
          <div class="input-icon">
            <i class="ti ti-lock"></i>
            <input id="login-pass" type="password" placeholder="••••••••" />
          </div>
        </div>
        <button class="btn btn-primary btn-full" id="btn-login">
          <i class="ti ti-login"></i> Entrar no sistema
        </button>
        <p style="text-align:center;margin-top:16px;font-size:12px;color:var(--gray-400);">
          Responsável TI: <strong>Tiago Souza</strong>
        </p>
      </div>

      <!-- REGISTER -->
      <div id="tab-register" style="display:none">
        <div class="form-group">
          <label class="required">Nome Completo</label>
          <input id="reg-nome" type="text" placeholder="Seu nome completo" />
        </div>
        <div class="form-group">
          <label class="required">E-mail</label>
          <input id="reg-email" type="email" placeholder="email@escolamiro.com.br" />
        </div>
        <div class="form-group">
          <label class="required">Nome de Usuário</label>
          <input id="reg-usuario" type="text" placeholder="sem espaços (ex: ana.silva)" />
        </div>
        <div class="form-group">
          <label class="required">Senha</label>
          <input id="reg-senha" type="password" placeholder="Mínimo 6 caracteres" />
        </div>
        <button class="btn btn-primary btn-full" id="btn-register">
          <i class="ti ti-user-plus"></i> Criar minha conta
        </button>
      </div>
    </div>
  </div>`;
}

function attachAuthEvents() {
  $$('.auth-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.auth-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      $('#tab-login').style.display = tab === 'login' ? '' : 'none';
      $('#tab-register').style.display = tab === 'register' ? '' : 'none';
    });
  });

  $('#btn-login').addEventListener('click', () => {
    const u = $('#login-user').value.trim();
    const p = $('#login-pass').value;
    const found = STATE.users.find(usr =>
      (usr.usuario === u || usr.email === u) && usr.status === 'ativo'
    );
    if (!found) { toast('Usuário/senha inválidos ou conta suspensa.', 'error'); return; }
    STATE.currentUser = found;
    render();
    toast(`Bem-vindo, ${found.nome.split(' ')[0]}!`);
  });

  $('#btn-register').addEventListener('click', () => {
    const nome    = $('#reg-nome').value.trim();
    const email   = $('#reg-email').value.trim();
    const usuario = $('#reg-usuario').value.trim();
    const senha   = $('#reg-senha').value;
    if (!nome || !email || !usuario || !senha) { toast('Preencha todos os campos.', 'error'); return; }
    if (senha.length < 6) { toast('Senha deve ter pelo menos 6 caracteres.', 'error'); return; }
    if (STATE.users.find(u => u.usuario === usuario || u.email === email)) { toast('Usuário ou e-mail já cadastrado.', 'error'); return; }
    const novoUser = { id: STATE.nextId.usuario++, nome, email, usuario, role: 'usuario', status: 'ativo', criado: dateNow() };
    STATE.users.push(novoUser);
    addNotification(`Novo cadastro: ${nome}`, 'Usuário solicitou acesso ao sistema', 'ti-user-plus');
    toast('Conta criada! Agora faça o login.', 'success');
    $$('.auth-tab')[0].click();
  });
}

// ===== LAYOUT =====
function renderLayout() {
  const u = STATE.currentUser;
  const isAdmin = u.role === 'admin';
  const openChamados = STATE.chamados.filter(c => c.status === 'aberto').length;
  const unreadNotifs = STATE.notifications.filter(n => !n.lida).length;

  return `
  <div class="app-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">
      <div class="sidebar-logo-icon"><img src="logo.svg" alt="Logo" style="width:26px;height:26px;object-fit:contain" onerror="this.style.display='none';this.parentElement.innerHTML='<i class=\'ti ti-device-desktop\'></i>'"></div>
          <div class="sidebar-logo-text">
            <h2>TI — Escola Miró</h2>
            <span>Tiago Souza</span>
          </div>
        </div>
      </div>
      <div class="sidebar-user">
        <div class="sidebar-avatar">${initials(u.nome)}</div>
        <div class="sidebar-user-info">
          <h4>${u.nome.split(' ').slice(0,2).join(' ')}</h4>
          <span>${isAdmin ? 'Administrador' : 'Usuário'}</span>
        </div>
      </div>
      <nav class="sidebar-nav">
        <span class="nav-section-title">Geral</span>
        <button class="nav-item ${STATE.currentPage==='dashboard'?'active':''}" data-page="dashboard">
          <i class="ti ti-layout-dashboard"></i> Dashboard
        </button>
        <button class="nav-item ${STATE.currentPage==='reservas'?'active':''}" data-page="reservas">
          <i class="ti ti-calendar-event"></i> Reservas
        </button>
        <button class="nav-item ${STATE.currentPage==='chamados'?'active':''}" data-page="chamados">
          <i class="ti ti-headset"></i> Chamados
          ${openChamados > 0 ? `<span class="nav-badge">${openChamados}</span>` : ''}
        </button>
        <button class="nav-item ${STATE.currentPage==='arquivados'?'active':''}" data-page="arquivados">
          <i class="ti ti-archive"></i> Arquivados
        </button>
        ${isAdmin ? `
        <span class="nav-section-title">Administração</span>
        <button class="nav-item ${STATE.currentPage==='equipamentos'?'active':''}" data-page="equipamentos">
          <i class="ti ti-devices"></i> Equipamentos
        </button>
        <button class="nav-item ${STATE.currentPage==='usuarios'?'active':''}" data-page="usuarios">
          <i class="ti ti-users"></i> Usuários
        </button>
        <button class="nav-item ${STATE.currentPage==='relatorios'?'active':''}" data-page="relatorios">
          <i class="ti ti-chart-bar"></i> Relatórios
        </button>
        ` : ''}
      </nav>
      <div class="sidebar-footer">
        <button class="nav-item" id="btn-logout" style="color:rgba(255,255,255,.5)">
          <i class="ti ti-logout"></i> Sair
        </button>
      </div>
    </aside>

    <div class="main-content">
      <header class="main-header">
        <h1 class="page-title" id="page-title">Dashboard</h1>
        <div class="header-actions">
          <div class="notification-btn" style="position:relative">
            <button class="btn-icon" id="notif-btn" title="Notificações">
              <i class="ti ti-bell" style="font-size:20px"></i>
              ${unreadNotifs > 0 ? `<span class="notification-dot"></span>` : ''}
            </button>
          </div>
          <button class="btn btn-primary btn-sm" id="btn-new-action">
            <i class="ti ti-plus"></i> Novo
          </button>
        </div>
      </header>
      <main class="page-content" id="page-content"></main>
    </div>
  </div>`;
}

function attachLayoutEvents() {
  $$('.nav-item[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      STATE.currentPage = btn.dataset.page;
      const titles = { dashboard: 'Dashboard', reservas: 'Reservas', chamados: 'Chamados', arquivados: 'Arquivados', equipamentos: 'Equipamentos', usuarios: 'Usuários', relatorios: 'Relatórios & Gráficos' };
      $('#page-title').textContent = titles[STATE.currentPage] || STATE.currentPage;
      $$('.nav-item[data-page]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPage(STATE.currentPage);
    });
  });

  $('#btn-logout').addEventListener('click', () => {
    STATE.currentUser = null;
    STATE.currentPage = 'dashboard';
    render();
  });

  $('#notif-btn').addEventListener('click', e => {
    e.stopPropagation();
    const existing = $('.notif-panel');
    if (existing) { existing.remove(); return; }
    const panel = document.createElement('div');
    panel.className = 'notif-panel';
    const unread = STATE.notifications.filter(n => !n.lida);
    panel.innerHTML = `
      <div class="notif-header">
        <span>Notificações</span>
        <button class="btn-icon" onclick="STATE.notifications.forEach(n=>n.lida=true);this.closest('.notif-panel').remove();updateNotifBadge();" title="Marcar lidas">
          <i class="ti ti-checks" style="font-size:14px"></i>
        </button>
      </div>
      ${STATE.notifications.length === 0
        ? '<p style="padding:20px;text-align:center;font-size:12px;color:var(--gray-400)">Nenhuma notificação</p>'
        : STATE.notifications.slice(0,8).map(n => `
          <div class="notif-item ${!n.lida?'unread':''}">
            <div class="notif-icon"><i class="ti ${n.icon}"></i></div>
            <div class="notif-text">
              <div class="notif-title">${n.titulo}</div>
              <div class="notif-sub">${n.sub} · ${formatDate(n.data)}</div>
            </div>
          </div>`).join('')
      }`;
    $('#notif-btn').parentElement.appendChild(panel);
    STATE.notifications.forEach(n => n.lida = true);
    setTimeout(updateNotifBadge, 100);
    document.addEventListener('click', () => panel.remove(), { once: true });
  });

  $('#btn-new-action').addEventListener('click', () => {
    const page = STATE.currentPage;
    if (page === 'reservas' || page === 'dashboard') openModalReserva();
    else if (page === 'chamados') openModalChamado();
    else if (page === 'equipamentos') openModalEquipamento();
    else if (page === 'usuarios') openModalUsuario();
    else openModalReserva();
  });
}

function updateNotifBadge() {
  const unread = STATE.notifications.filter(n => !n.lida).length;
  const dot = $('.notification-dot');
  if (dot) dot.style.display = unread > 0 ? '' : 'none';
  const badge = $('.nav-badge');
  const openCh = STATE.chamados.filter(c => c.status === 'aberto').length;
  if (badge) badge.textContent = openCh;
}

function addNotification(titulo, sub, icon = 'ti-info-circle') {
  STATE.notifications.unshift({ titulo, sub, icon, data: dateNow(), lida: false });
  updateNotifBadge();
}

// ===== PAGE ROUTER =====
function renderPage(page) {
  const content = $('#page-content');
  if (!content) return;
  const pages = { dashboard, reservas, chamados, arquivados, equipamentos, usuarios, relatorios };
  if (pages[page]) content.innerHTML = pages[page]();
  else content.innerHTML = `<p>Página não encontrada.</p>`;
  attachPageEvents(page);
}

// ===== DASHBOARD =====
function dashboard() {
  const hoje = dateNow();
  const reservasHoje = STATE.reservas.filter(r => r.dataInicio === hoje && r.status === 'ativo');
  const chamadosHoje = STATE.chamados.filter(c => c.criado === hoje);
  const abertos = STATE.chamados.filter(c => c.status === 'aberto').length;
  const andamento = STATE.chamados.filter(c => c.status === 'andamento').length;
  const fechados = STATE.chamados.filter(c => c.status === 'fechado').length;
  const reservasAtivas = STATE.reservas.filter(r => r.status === 'ativo').length;

  return `
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-icon blue"><i class="ti ti-calendar-event"></i></div>
      <div class="stat-info">
        <div class="stat-number">${reservasAtivas}</div>
        <div class="stat-label">Reservas Ativas</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon red"><i class="ti ti-alert-circle"></i></div>
      <div class="stat-info">
        <div class="stat-number">${abertos}</div>
        <div class="stat-label">Chamados Abertos</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon orange"><i class="ti ti-loader"></i></div>
      <div class="stat-info">
        <div class="stat-number">${andamento}</div>
        <div class="stat-label">Em Andamento</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon green"><i class="ti ti-circle-check"></i></div>
      <div class="stat-info">
        <div class="stat-number">${fechados}</div>
        <div class="stat-label">Chamados Fechados</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon teal"><i class="ti ti-devices"></i></div>
      <div class="stat-info">
        <div class="stat-number">${STATE.equipamentos.filter(e=>e.status==='disponivel').length}</div>
        <div class="stat-label">Equipamentos Disponíveis</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon purple"><i class="ti ti-users"></i></div>
      <div class="stat-info">
        <div class="stat-number">${STATE.users.filter(u=>u.status==='ativo').length}</div>
        <div class="stat-label">Usuários Ativos</div>
      </div>
    </div>
  </div>

  <div class="grid-2" style="margin-bottom:24px">
    <div class="card">
      <div class="card-header">
        <span class="card-title"><i class="ti ti-calendar-today"></i> Reservas de Hoje</span>
        <button class="btn btn-primary btn-sm" onclick="openModalReserva()"><i class="ti ti-plus"></i> Nova</button>
      </div>
      <div class="card-body">
        ${reservasHoje.length === 0
          ? '<div class="empty-state"><i class="ti ti-calendar-off"></i><h3>Nenhuma reserva hoje</h3></div>'
          : reservasHoje.map(r => `
            <div class="today-item">
              <div class="today-item-icon blue" style="background:var(--primary-light);color:var(--primary)">
                <i class="ti ti-device-laptop"></i>
              </div>
              <div class="today-item-info">
                <div class="today-item-title">${r.equipamento}</div>
                <div class="today-item-sub">${r.solicitante} · ${r.sala} · ${r.horaInicio}–${r.horaFim}</div>
              </div>
              <span class="badge badge-reservado">${r.status}</span>
            </div>`).join('')
        }
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title"><i class="ti ti-headset"></i> Chamados de Hoje</span>
        <button class="btn btn-primary btn-sm" onclick="openModalChamado()"><i class="ti ti-plus"></i> Novo</button>
      </div>
      <div class="card-body">
        ${chamadosHoje.length === 0
          ? '<div class="empty-state"><i class="ti ti-mood-happy"></i><h3>Sem chamados hoje</h3><p>Tudo certo por enquanto!</p></div>'
          : chamadosHoje.map(c => `
            <div class="today-item">
              <div class="today-item-icon" style="background:${c.prioridade==='Alta'?'var(--danger-bg)':'var(--warning-bg)'};color:${c.prioridade==='Alta'?'var(--danger)':'var(--warning)'}">
                <i class="ti ti-urgent"></i>
              </div>
              <div class="today-item-info">
                <div class="today-item-title">${c.titulo}</div>
                <div class="today-item-sub">${c.solicitante} · ${c.categoria}</div>
              </div>
              <span class="badge badge-${c.status}">${c.status}</span>
            </div>`).join('')
        }
      </div>
    </div>
  </div>

  <div class="grid-2">
    <div class="card">
      <div class="card-header">
        <span class="card-title"><i class="ti ti-chart-donut"></i> Status dos Chamados</span>
      </div>
      <div class="card-body">
        <div class="chart-container"><canvas id="chart-status"></canvas></div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="card-title"><i class="ti ti-chart-bar"></i> Chamados por Categoria</span>
      </div>
      <div class="card-body">
        <div class="chart-container"><canvas id="chart-cat"></canvas></div>
      </div>
    </div>
  </div>`;
}

function attachPageEvents(page) {
  if (page === 'dashboard') {
    setTimeout(() => {
      renderChartStatus();
      renderChartCat();
    }, 100);
  }
  if (page === 'reservas') attachReservaEvents();
  if (page === 'chamados') attachChamadoEvents();
  if (page === 'usuarios') attachUsuarioEvents();
  if (page === 'equipamentos') attachEquipamentoEvents();
  if (page === 'relatorios') setTimeout(renderRelatorioCharts, 200);
}

function renderChartStatus() {
  const ctx = document.getElementById('chart-status');
  if (!ctx) return;
  const data = {
    aberto: STATE.chamados.filter(c => c.status === 'aberto').length,
    andamento: STATE.chamados.filter(c => c.status === 'andamento').length,
    fechado: STATE.chamados.filter(c => c.status === 'fechado').length,
    suspenso: STATE.chamados.filter(c => c.status === 'suspenso').length,
  };
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Aberto', 'Em Andamento', 'Fechado', 'Suspenso'],
      datasets: [{ data: Object.values(data), backgroundColor: ['#e74c3c','#e67e22','#27ae60','#95a5a6'], borderWidth: 0 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { font: { family: 'Nunito', size: 12 } } } } }
  });
}

function renderChartCat() {
  const ctx = document.getElementById('chart-cat');
  if (!ctx) return;
  const cats = {};
  STATE.chamados.forEach(c => { cats[c.categoria] = (cats[c.categoria] || 0) + 1; });
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(cats),
      datasets: [{ label: 'Chamados', data: Object.values(cats), backgroundColor: '#0073c8', borderRadius: 6 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
  });
}

// ===== RESERVAS PAGE =====
function reservas() {
  const ativas = STATE.reservas.filter(r => r.status !== 'fechado' && r.status !== 'cancelado');
  return `
  <div class="filter-bar">
    <div class="search-bar"><i class="ti ti-search"></i><input type="text" placeholder="Buscar reserva..." id="search-reserva" /></div>
    <select class="filter-select" id="filter-reserva-status">
      <option value="">Todos os status</option>
      <option value="ativo">Ativo</option>
      <option value="suspenso">Suspenso</option>
      <option value="fechado">Fechado</option>
      <option value="cancelado">Cancelado</option>
    </select>
    <button class="btn btn-primary" onclick="openModalReserva()"><i class="ti ti-plus"></i> Nova Reserva</button>
  </div>
  <div class="card">
    <div class="card-header">
      <span class="card-title"><i class="ti ti-calendar-event"></i> Reservas (${ativas.length})</span>
    </div>
    <div class="table-wrapper">
      <table id="reservas-table">
        <thead><tr>
          <th>Equipamento</th>
          <th>Solicitante</th>
          <th>Cargo</th>
          <th>Sala</th>
          <th>Data</th>
          <th>Horário</th>
          <th>Qtd</th>
          <th>Status</th>
          <th>Ações</th>
        </tr></thead>
        <tbody id="reservas-tbody">
          ${renderReservasRows(STATE.reservas)}
        </tbody>
      </table>
    </div>
  </div>`;
}

function renderReservasRows(list) {
  if (list.length === 0) return `<tr><td colspan="9"><div class="empty-state"><i class="ti ti-calendar-off"></i><h3>Nenhuma reserva encontrada</h3></div></td></tr>`;
  return list.map(r => `
    <tr>
      <td><strong>${r.equipamento}</strong><br><span class="text-muted">${r.equipamentoTipo}</span></td>
      <td>${r.solicitante}</td>
      <td><span class="text-muted">${r.cargo}</span></td>
      <td>${r.sala}</td>
      <td>${formatDate(r.dataInicio)}</td>
      <td>${r.horaInicio} – ${r.horaFim}</td>
      <td><strong>${r.quantidade}</strong></td>
      <td><span class="badge badge-${r.status}">${r.status}</span></td>
      <td>
        <div class="actions-menu">
          <button class="btn-icon" onclick="toggleActionsMenu(this)" title="Ações"><i class="ti ti-dots-vertical"></i></button>
          <div class="actions-dropdown" style="display:none">
            <button onclick="editReserva(${r.id})"><i class="ti ti-edit"></i> Editar</button>
            <button onclick="changeReservaStatus(${r.id},'suspenso')"><i class="ti ti-player-pause"></i> Suspender</button>
            <button onclick="changeReservaStatus(${r.id},'fechado')"><i class="ti ti-circle-check"></i> Fechar</button>
            <button onclick="changeReservaStatus(${r.id},'ativo')"><i class="ti ti-refresh"></i> Reativar</button>
            <hr>
            <button class="danger" onclick="deleteReserva(${r.id})"><i class="ti ti-trash"></i> Excluir</button>
          </div>
        </div>
      </td>
    </tr>`).join('');
}

function attachReservaEvents() {
  const search = $('#search-reserva');
  const filterStatus = $('#filter-reserva-status');
  function applyFilter() {
    const q = search.value.toLowerCase();
    const st = filterStatus.value;
    const filtered = STATE.reservas.filter(r => {
      const match = !q || r.equipamento.toLowerCase().includes(q) || r.solicitante.toLowerCase().includes(q);
      const stMatch = !st || r.status === st;
      return match && stMatch;
    });
    $('#reservas-tbody').innerHTML = renderReservasRows(filtered);
    attachActionsMenus();
  }
  if (search) search.addEventListener('input', applyFilter);
  if (filterStatus) filterStatus.addEventListener('change', applyFilter);
  attachActionsMenus();
}

// ===== CHAMADOS PAGE =====
function chamados() {
  const ativos = STATE.chamados.filter(c => c.status !== 'fechado' && c.status !== 'cancelado');
  return `
  <div class="filter-bar">
    <div class="search-bar"><i class="ti ti-search"></i><input type="text" placeholder="Buscar chamado..." id="search-chamado" /></div>
    <select class="filter-select" id="filter-chamado-status">
      <option value="">Todos</option>
      <option value="aberto">Aberto</option>
      <option value="andamento">Em Andamento</option>
      <option value="suspenso">Suspenso</option>
      <option value="pendente">Pendente</option>
    </select>
    <select class="filter-select" id="filter-chamado-prio">
      <option value="">Prioridade</option>
      <option value="Alta">Alta</option>
      <option value="Media">Média</option>
      <option value="Baixa">Baixa</option>
    </select>
    <button class="btn btn-primary" onclick="openModalChamado()"><i class="ti ti-plus"></i> Novo Chamado</button>
  </div>
  <div class="card">
    <div class="card-header">
      <span class="card-title"><i class="ti ti-headset"></i> Chamados Ativos (${ativos.length})</span>
    </div>
    <div class="table-wrapper">
      <table>
        <thead><tr>
          <th>#</th>
          <th>Título</th>
          <th>Categoria</th>
          <th>Prioridade</th>
          <th>Solicitante</th>
          <th>Atribuído</th>
          <th>Status</th>
          <th>Criado</th>
          <th>Ações</th>
        </tr></thead>
        <tbody id="chamados-tbody">
          ${renderChamadosRows(ativos)}
        </tbody>
      </table>
    </div>
  </div>`;
}

function prioColor(p) {
  return p === 'Alta' ? '#e74c3c' : p === 'Media' ? '#e67e22' : '#27ae60';
}

function renderChamadosRows(list) {
  if (list.length === 0) return `<tr><td colspan="9"><div class="empty-state"><i class="ti ti-mood-happy"></i><h3>Nenhum chamado ativo</h3></div></td></tr>`;
  return list.map(c => `
    <tr>
      <td><strong style="color:var(--primary)">#${c.id}</strong></td>
      <td><strong>${c.titulo}</strong><br><span class="text-muted">${c.descricao.slice(0,40)}...</span></td>
      <td>${c.categoria}</td>
      <td><span style="color:${prioColor(c.prioridade)};font-weight:700">${c.prioridade}</span></td>
      <td>${c.solicitante}</td>
      <td>${c.atribuido || '<span class="text-muted">—</span>'}</td>
      <td><span class="badge badge-${c.status}">${c.status}</span></td>
      <td>${formatDate(c.criado)}</td>
      <td>
        <div class="actions-menu">
          <button class="btn-icon" onclick="toggleActionsMenu(this)" title="Ações"><i class="ti ti-dots-vertical"></i></button>
          <div class="actions-dropdown" style="display:none">
            <button onclick="editChamado(${c.id})"><i class="ti ti-edit"></i> Editar</button>
            <button onclick="changeChamadoStatus(${c.id},'andamento')"><i class="ti ti-loader"></i> Em Andamento</button>
            <button onclick="changeChamadoStatus(${c.id},'pendente')"><i class="ti ti-clock"></i> Pendente</button>
            <button onclick="changeChamadoStatus(${c.id},'suspenso')"><i class="ti ti-player-pause"></i> Suspender</button>
            <button onclick="changeChamadoStatus(${c.id},'fechado')"><i class="ti ti-circle-check"></i> Fechar</button>
            <hr>
            <button class="danger" onclick="deleteChamado(${c.id})"><i class="ti ti-trash"></i> Excluir</button>
          </div>
        </div>
      </td>
    </tr>`).join('');
}

function attachChamadoEvents() {
  const search = $('#search-chamado');
  const filterSt = $('#filter-chamado-status');
  const filterPrio = $('#filter-chamado-prio');
  function applyFilter() {
    const q = search.value.toLowerCase();
    const st = filterSt.value;
    const prio = filterPrio.value;
    const filtered = STATE.chamados.filter(c => {
      if (c.status === 'fechado' || c.status === 'cancelado') return false;
      const match = !q || c.titulo.toLowerCase().includes(q) || c.solicitante.toLowerCase().includes(q);
      const stMatch = !st || c.status === st;
      const prioMatch = !prio || c.prioridade === prio;
      return match && stMatch && prioMatch;
    });
    $('#chamados-tbody').innerHTML = renderChamadosRows(filtered);
    attachActionsMenus();
  }
  if (search) search.addEventListener('input', applyFilter);
  if (filterSt) filterSt.addEventListener('change', applyFilter);
  if (filterPrio) filterPrio.addEventListener('change', applyFilter);
  attachActionsMenus();
}

// ===== ARQUIVADOS =====
function arquivados() {
  const arquiv = [...STATE.chamados.filter(c => c.status === 'fechado' || c.status === 'cancelado'),
                  ...STATE.reservas.filter(r => r.status === 'fechado' || r.status === 'cancelado')];
  return `
  <div class="tabs">
    <button class="tab active" data-arq="chamados">Chamados Encerrados</button>
    <button class="tab" data-arq="reservas">Reservas Encerradas</button>
  </div>
  <div id="arq-content">
    ${renderArqChamados()}
  </div>`;
}

function renderArqChamados() {
  const list = STATE.chamados.filter(c => c.status === 'fechado' || c.status === 'cancelado');
  return `
  <div class="card">
    <div class="card-header"><span class="card-title"><i class="ti ti-archive"></i> Chamados Arquivados (${list.length})</span></div>
    <div class="table-wrapper">
      <table>
        <thead><tr><th>#</th><th>Título</th><th>Categoria</th><th>Solicitante</th><th>Status</th><th>Atualizado</th><th>Ações</th></tr></thead>
        <tbody>
          ${list.length === 0 ? '<tr><td colspan="7"><div class="empty-state"><i class="ti ti-archive"></i><h3>Nenhum chamado arquivado</h3></div></td></tr>'
            : list.map(c => `
            <tr>
              <td><strong style="color:var(--primary)">#${c.id}</strong></td>
              <td><strong>${c.titulo}</strong></td>
              <td>${c.categoria}</td>
              <td>${c.solicitante}</td>
              <td><span class="badge badge-${c.status}">${c.status}</span></td>
              <td>${formatDate(c.atualizado)}</td>
              <td>
                <div style="display:flex;gap:6px">
                  <button class="btn btn-sm btn-ghost" onclick="changeChamadoStatus(${c.id},'aberto');renderPage('arquivados')"><i class="ti ti-refresh"></i> Reabrir</button>
                  <button class="btn btn-sm btn-ghost" onclick="editChamado(${c.id})"><i class="ti ti-edit"></i></button>
                  <button class="btn btn-sm btn-danger" onclick="deleteChamado(${c.id});renderPage('arquivados')"><i class="ti ti-trash"></i></button>
                </div>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

function renderArqReservas() {
  const list = STATE.reservas.filter(r => r.status === 'fechado' || r.status === 'cancelado');
  return `
  <div class="card">
    <div class="card-header"><span class="card-title"><i class="ti ti-calendar-off"></i> Reservas Arquivadas (${list.length})</span></div>
    <div class="table-wrapper">
      <table>
        <thead><tr><th>Equipamento</th><th>Solicitante</th><th>Sala</th><th>Data</th><th>Status</th><th>Ações</th></tr></thead>
        <tbody>
          ${list.length === 0 ? '<tr><td colspan="6"><div class="empty-state"><i class="ti ti-calendar-off"></i><h3>Nenhuma reserva arquivada</h3></div></td></tr>'
            : list.map(r => `
            <tr>
              <td><strong>${r.equipamento}</strong></td>
              <td>${r.solicitante}</td>
              <td>${r.sala}</td>
              <td>${formatDate(r.dataInicio)}</td>
              <td><span class="badge badge-${r.status}">${r.status}</span></td>
              <td>
                <div style="display:flex;gap:6px">
                  <button class="btn btn-sm btn-ghost" onclick="changeReservaStatus(${r.id},'ativo');renderPage('arquivados')"><i class="ti ti-refresh"></i> Reativar</button>
                  <button class="btn btn-sm btn-danger" onclick="deleteReserva(${r.id});renderPage('arquivados')"><i class="ti ti-trash"></i></button>
                </div>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

// ===== EQUIPAMENTOS =====
function equipamentos() {
  return `
  <div class="filter-bar">
    <div class="search-bar"><i class="ti ti-search"></i><input type="text" placeholder="Buscar equipamento..." id="search-equip" /></div>
    <select class="filter-select" id="filter-equip-tipo">
      <option value="">Todos os tipos</option>
      <option>Notebook</option><option>iPad</option><option>Projetor</option>
      <option>Caixa de Som</option><option>Monitor</option><option>Impressora</option><option>Outro</option>
    </select>
    <button class="btn btn-primary" onclick="openModalEquipamento()"><i class="ti ti-plus"></i> Novo Equipamento</button>
  </div>
  <div class="card">
    <div class="card-header">
      <span class="card-title"><i class="ti ti-devices"></i> Equipamentos (${STATE.equipamentos.length})</span>
    </div>
    <div class="table-wrapper">
      <table>
        <thead><tr>
          <th>Nome</th><th>Tipo</th><th>Patrimônio</th><th>Descrição</th><th>Status</th><th>Ações</th>
        </tr></thead>
        <tbody id="equip-tbody">
          ${renderEquipRows(STATE.equipamentos)}
        </tbody>
      </table>
    </div>
  </div>`;
}

function equipStatus(s) {
  const map = { disponivel: 'badge-fechado', reservado: 'badge-reservado', manutencao: 'badge-andamento', inativo: 'badge-suspenso' };
  const label = { disponivel: 'Disponível', reservado: 'Reservado', manutencao: 'Manutenção', inativo: 'Inativo' };
  return `<span class="badge ${map[s]||'badge-cancelado'}">${label[s]||s}</span>`;
}

function renderEquipRows(list) {
  if (list.length === 0) return `<tr><td colspan="6"><div class="empty-state"><i class="ti ti-devices-off"></i><h3>Nenhum equipamento</h3></div></td></tr>`;
  return list.map(e => `
    <tr>
      <td><strong>${e.nome}</strong></td>
      <td>${e.tipo}</td>
      <td><code style="background:var(--gray-100);padding:2px 6px;border-radius:4px;font-size:12px">${e.patrimonio}</code></td>
      <td><span class="text-muted">${e.descricao}</span></td>
      <td>${equipStatus(e.status)}</td>
      <td>
        <div style="display:flex;gap:6px">
          <button class="btn-icon" onclick="editEquipamento(${e.id})" title="Editar"><i class="ti ti-edit"></i></button>
          <button class="btn-icon" onclick="deleteEquipamento(${e.id})" title="Excluir" style="color:var(--danger)"><i class="ti ti-trash"></i></button>
        </div>
      </td>
    </tr>`).join('');
}

function attachEquipamentoEvents() {
  const search = $('#search-equip');
  const filterTipo = $('#filter-equip-tipo');
  function applyFilter() {
    const q = (search?.value || '').toLowerCase();
    const t = filterTipo?.value || '';
    const filtered = STATE.equipamentos.filter(e => {
      const match = !q || e.nome.toLowerCase().includes(q) || e.patrimonio.toLowerCase().includes(q);
      const tMatch = !t || e.tipo === t;
      return match && tMatch;
    });
    $('#equip-tbody').innerHTML = renderEquipRows(filtered);
  }
  if (search) search.addEventListener('input', applyFilter);
  if (filterTipo) filterTipo.addEventListener('change', applyFilter);
}

// ===== USUARIOS =====
function usuarios() {
  return `
  <div class="filter-bar">
    <div class="search-bar"><i class="ti ti-search"></i><input type="text" placeholder="Buscar usuário..." id="search-user" /></div>
    <select class="filter-select" id="filter-user-status">
      <option value="">Todos</option>
      <option value="ativo">Ativo</option>
      <option value="suspenso">Suspenso</option>
    </select>
    <button class="btn btn-primary" onclick="openModalUsuario()"><i class="ti ti-user-plus"></i> Novo Usuário</button>
  </div>
  <div class="card">
    <div class="card-header">
      <span class="card-title"><i class="ti ti-users"></i> Usuários (${STATE.users.length})</span>
    </div>
    <div class="table-wrapper">
      <table>
        <thead><tr>
          <th>Usuário</th><th>E-mail</th><th>Login</th><th>Perfil</th><th>Status</th><th>Cadastro</th><th>Ações</th>
        </tr></thead>
        <tbody id="users-tbody">
          ${renderUserRows(STATE.users)}
        </tbody>
      </table>
    </div>
  </div>`;
}

function renderUserRows(list) {
  if (list.length === 0) return `<tr><td colspan="7"><div class="empty-state"><i class="ti ti-users-off"></i><h3>Nenhum usuário</h3></div></td></tr>`;
  return list.map(u => `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:10px">
          <div class="user-avatar-lg" style="background:${u.role==='admin'?'var(--primary)':'#7b1fa2'}">${initials(u.nome)}</div>
          <div>
            <div style="font-weight:700">${u.nome}</div>
          </div>
        </div>
      </td>
      <td>${u.email}</td>
      <td><code style="background:var(--gray-100);padding:2px 6px;border-radius:4px;font-size:12px">${u.usuario}</code></td>
      <td><span class="badge" style="background:${u.role==='admin'?'#dbeafe':'#ede9fe'};color:${u.role==='admin'?'#1d4ed8':'#5b21b6'}">${u.role==='admin'?'Admin':'Usuário'}</span></td>
      <td><span class="badge ${u.status==='ativo'?'badge-fechado':'badge-suspenso'}">${u.status}</span></td>
      <td>${formatDate(u.criado)}</td>
      <td>
        <div style="display:flex;gap:6px">
          <button class="btn-icon" onclick="editUsuario(${u.id})" title="Editar"><i class="ti ti-edit"></i></button>
          <button class="btn-icon" onclick="toggleUserStatus(${u.id})" title="${u.status==='ativo'?'Suspender':'Ativar'}" style="color:${u.status==='ativo'?'var(--warning)':'var(--success)'}">
            <i class="ti ti-${u.status==='ativo'?'ban':'refresh'}"></i>
          </button>
          <button class="btn-icon" onclick="deleteUsuario(${u.id})" title="Excluir" style="color:var(--danger)"><i class="ti ti-trash"></i></button>
        </div>
      </td>
    </tr>`).join('');
}

function attachUsuarioEvents() {
  const search = $('#search-user');
  const filterSt = $('#filter-user-status');
  function applyFilter() {
    const q = (search?.value || '').toLowerCase();
    const st = filterSt?.value || '';
    const filtered = STATE.users.filter(u => {
      const match = !q || u.nome.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.usuario.toLowerCase().includes(q);
      const stMatch = !st || u.status === st;
      return match && stMatch;
    });
    $('#users-tbody').innerHTML = renderUserRows(filtered);
  }
  if (search) search.addEventListener('input', applyFilter);
  if (filterSt) filterSt.addEventListener('change', applyFilter);
}

// ===== RELATÓRIOS =====
function relatorios() {
  return `
  <div class="report-filters">
    <label style="font-weight:600;font-size:13px">Filtrar por:</label>
    <select class="filter-select" id="rel-tipo">
      <option value="todos">Todos</option>
      <option value="chamados">Chamados</option>
      <option value="reservas">Reservas</option>
    </select>
    <select class="filter-select" id="rel-periodo">
      <option value="mes">Este mês</option>
      <option value="trimestre">Trimestre</option>
      <option value="semestre">Semestre</option>
      <option value="anual">Anual</option>
      <option value="personalizado">Personalizado</option>
    </select>
    <input type="date" class="filter-select" id="rel-inicio" value="2025-01-01" />
    <input type="date" class="filter-select" id="rel-fim" value="${dateNow()}" />
    <button class="btn btn-primary" onclick="gerarRelatorio()"><i class="ti ti-chart-bar"></i> Gerar</button>
    <button class="btn btn-ghost" onclick="imprimirRelatorio()"><i class="ti ti-printer"></i> Imprimir</button>
    <button class="btn btn-ghost" onclick="exportarPDF()"><i class="ti ti-file-type-pdf"></i> PDF</button>
  </div>

  <div class="grid-2" style="margin-bottom:24px" id="rel-charts-area">
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="ti ti-chart-line"></i> Chamados por Mês</span></div>
      <div class="card-body"><div class="chart-container"><canvas id="chart-mensal"></canvas></div></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="ti ti-chart-pie"></i> Chamados por Prioridade</span></div>
      <div class="card-body"><div class="chart-container"><canvas id="chart-prio"></canvas></div></div>
    </div>
  </div>

  <div class="grid-2" style="margin-bottom:24px">
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="ti ti-chart-bar"></i> Uso por Equipamento</span></div>
      <div class="card-body"><div class="chart-container"><canvas id="chart-equip-uso"></canvas></div></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="ti ti-user-check"></i> Chamados por Usuário</span></div>
      <div class="card-body"><div class="chart-container"><canvas id="chart-user"></canvas></div></div>
    </div>
  </div>

  <div class="card" id="rel-table-area">
    <div class="card-header">
      <span class="card-title"><i class="ti ti-table"></i> Detalhamento de Chamados</span>
    </div>
    <div class="table-wrapper">
      <table>
        <thead><tr><th>#</th><th>Título</th><th>Categoria</th><th>Prioridade</th><th>Solicitante</th><th>Status</th><th>Criado</th></tr></thead>
        <tbody>
          ${STATE.chamados.map(c => `
          <tr>
            <td><strong>#${c.id}</strong></td>
            <td>${c.titulo}</td>
            <td>${c.categoria}</td>
            <td><span style="color:${prioColor(c.prioridade)};font-weight:700">${c.prioridade}</span></td>
            <td>${c.solicitante}</td>
            <td><span class="badge badge-${c.status}">${c.status}</span></td>
            <td>${formatDate(c.criado)}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

function renderRelatorioCharts() {
  const meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  const dadosMes = meses.map((_, i) => Math.floor(Math.random() * 8) + 1);

  const ctx1 = document.getElementById('chart-mensal');
  if (ctx1) new Chart(ctx1, {
    type: 'line',
    data: { labels: meses, datasets: [{ label: 'Chamados', data: dadosMes, borderColor: '#0073c8', backgroundColor: 'rgba(0,115,200,.08)', tension: .4, fill: true, pointRadius: 4 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
  });

  const ctx2 = document.getElementById('chart-prio');
  if (ctx2) new Chart(ctx2, {
    type: 'pie',
    data: {
      labels: ['Alta', 'Média', 'Baixa'],
      datasets: [{ data: [
        STATE.chamados.filter(c=>c.prioridade==='Alta').length,
        STATE.chamados.filter(c=>c.prioridade==='Media').length,
        STATE.chamados.filter(c=>c.prioridade==='Baixa').length,
      ], backgroundColor: ['#e74c3c','#e67e22','#27ae60'], borderWidth: 0 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
  });

  const ctx3 = document.getElementById('chart-equip-uso');
  const equipUso = {};
  STATE.reservas.forEach(r => { equipUso[r.equipamentoTipo] = (equipUso[r.equipamentoTipo] || 0) + 1; });
  if (ctx3) new Chart(ctx3, {
    type: 'bar',
    data: { labels: Object.keys(equipUso), datasets: [{ label: 'Reservas', data: Object.values(equipUso), backgroundColor: '#0073c8', borderRadius: 6 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
  });

  const ctx4 = document.getElementById('chart-user');
  const userUso = {};
  STATE.chamados.forEach(c => { userUso[c.solicitante.split(' ')[0]] = (userUso[c.solicitante.split(' ')[0]] || 0) + 1; });
  if (ctx4) new Chart(ctx4, {
    type: 'bar',
    data: { labels: Object.keys(userUso), datasets: [{ label: 'Chamados', data: Object.values(userUso), backgroundColor: ['#0073c8','#27ae60','#e67e22','#e74c3c'], borderRadius: 6 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
  });
}

function gerarRelatorio() { toast('Relatório gerado com sucesso!', 'success'); }
function imprimirRelatorio() { window.print(); }
function exportarPDF() { toast('Exportação PDF iniciada (requer configuração do servidor).', 'info'); }

// ===== ACTIONS MENUS =====
function toggleActionsMenu(btn) {
  $$('.actions-dropdown').forEach(d => {
    if (d !== btn.nextElementSibling) d.style.display = 'none';
  });
  const menu = btn.nextElementSibling;
  menu.style.display = menu.style.display === 'none' ? '' : 'none';
  if (menu.style.display !== 'none') {
    setTimeout(() => document.addEventListener('click', () => menu.style.display = 'none', { once: true }), 10);
  }
}

function attachActionsMenus() {
  // already using inline onclick, just close on outside click
}

// ===== STATUS CHANGERS =====
function changeReservaStatus(id, status) {
  const r = STATE.reservas.find(r => r.id === id);
  if (r) { r.status = status; toast(`Reserva ${status}!`); renderPage(STATE.currentPage); }
}

function changeChamadoStatus(id, status) {
  const c = STATE.chamados.find(c => c.id === id);
  if (c) { c.status = status; c.atualizado = dateNow(); toast(`Chamado ${status}!`); renderPage(STATE.currentPage); }
}

function deleteReserva(id) {
  if (!confirm('Excluir esta reserva?')) return;
  const idx = STATE.reservas.findIndex(r => r.id === id);
  if (idx > -1) { STATE.reservas.splice(idx, 1); toast('Reserva excluída.', 'info'); renderPage(STATE.currentPage); }
}

function deleteChamado(id) {
  if (!confirm('Excluir este chamado?')) return;
  const idx = STATE.chamados.findIndex(c => c.id === id);
  if (idx > -1) { STATE.chamados.splice(idx, 1); toast('Chamado excluído.', 'info'); renderPage(STATE.currentPage); }
}

function deleteEquipamento(id) {
  if (!confirm('Excluir este equipamento?')) return;
  const idx = STATE.equipamentos.findIndex(e => e.id === id);
  if (idx > -1) { STATE.equipamentos.splice(idx, 1); toast('Equipamento excluído.', 'info'); renderPage('equipamentos'); }
}

function deleteUsuario(id) {
  if (id === STATE.currentUser.id) { toast('Não pode excluir seu próprio usuário.', 'error'); return; }
  if (!confirm('Excluir este usuário?')) return;
  const idx = STATE.users.findIndex(u => u.id === id);
  if (idx > -1) { STATE.users.splice(idx, 1); toast('Usuário excluído.', 'info'); renderPage('usuarios'); }
}

function toggleUserStatus(id) {
  const u = STATE.users.find(u => u.id === id);
  if (!u) return;
  u.status = u.status === 'ativo' ? 'suspenso' : 'ativo';
  toast(`Usuário ${u.status === 'ativo' ? 'reativado' : 'suspenso'}.`, 'info');
  renderPage('usuarios');
}

// ===== MODAL: NOVA RESERVA =====
const CARGOS = ['Professor(a)','Coordenador(a)','Assistente','Estagiário(a) Nome do professor(a)','Administrativo'];
const SALAS = ['Grupo 1','Grupo 2','Grupo 3','Grupo 4','Grupo 5','1º Ano','2º Ano','3º Ano','4º Ano','5º Ano','6º Ano','7º Ano','8º Ano','9º Ano','1º Ano EM','2º Ano EM','3º Ano EM','Outro'];
const HORAS = Array.from({length:24}, (_,i) => `${String(i).padStart(2,'0')}:00`);
const TIPOS = [...new Set(STATE.equipamentos.map(e => e.tipo)), 'Outro'];

function openModalReserva(reservaId = null) {
  const r = reservaId ? STATE.reservas.find(r => r.id === reservaId) : null;
  openModal(`
  <div class="modal modal-lg">
    <div class="modal-header">
      <span class="modal-title"><i class="ti ti-calendar-plus"></i> ${r ? 'Editar Reserva' : 'Nova Reserva'}</span>
      <button class="btn-icon" onclick="closeModal()"><i class="ti ti-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-row">
        <div class="form-group">
          <label class="required">Tipo de Equipamento</label>
          <select id="res-tipo" onchange="updateEquipList()">
            <option value="">Selecione...</option>
            ${TIPOS.map(t => `<option ${r?.equipamentoTipo===t?'selected':''}>${t}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="required">Equipamento</label>
          <select id="res-equip">
            <option value="">Selecione o tipo primeiro...</option>
          </select>
        </div>
      </div>
      <div class="form-group" id="res-outro-equip-group" style="display:none">
        <label class="required">Especifique o equipamento</label>
        <input type="text" id="res-outro-equip" placeholder="Descreva o equipamento..." />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="required">Cargo</label>
          <select id="res-cargo">
            <option value="">Selecione...</option>
            ${CARGOS.map(c => `<option ${r?.cargo===c?'selected':''}>${c}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="required">Nome do Solicitante</label>
          <input type="text" id="res-nome" placeholder="Nome completo" value="${r?.solicitante||''}" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="required">Sala / Turma</label>
          <select id="res-sala" onchange="toggleOutroSala(this)">
            <option value="">Selecione...</option>
            ${SALAS.map(s => `<option ${r?.sala===s?'selected':''}>${s}</option>`).join('')}
          </select>
        </div>
        <div class="form-group" id="res-outro-sala-group" style="display:none">
          <label class="required">Especifique a sala</label>
          <input type="text" id="res-outro-sala" placeholder="Nome da sala..." />
        </div>
        <div class="form-group">
          <label class="required">Data da Reserva</label>
          <input type="date" id="res-data" value="${r?.dataInicio || dateNow()}" min="${dateNow()}" />
        </div>
      </div>
      <div class="form-row-3">
        <div class="form-group">
          <label class="required">Horário Início</label>
          <select id="res-hinicio">
            ${HORAS.map(h => `<option ${r?.horaInicio===h?'selected':''}>${h}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="required">Horário Fim</label>
          <select id="res-hfim">
            ${HORAS.map(h => `<option ${r?.horaFim===h?'selected':''}>${h}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="required">Quantidade</label>
          <div class="qty-control">
            <button class="qty-btn" type="button" onclick="changeQty(-1)">−</button>
            <input class="qty-value" type="number" id="res-qtd" value="${r?.quantidade||1}" min="1" max="99" />
            <button class="qty-btn" type="button" onclick="changeQty(1)">+</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-primary" onclick="salvarReserva(${reservaId||'null'})">
        <i class="ti ti-check"></i> ${r ? 'Salvar Alterações' : 'Confirmar Reserva'}
      </button>
    </div>
  </div>`);
  if (r) { setTimeout(() => { updateEquipList(r.equipamento); }, 50); }
}

function updateEquipList(selectedEquip = '') {
  const tipo = $('#res-tipo')?.value;
  const sel = $('#res-equip');
  const outroGroup = $('#res-outro-equip-group');
  if (!sel) return;
  if (tipo === 'Outro') {
    sel.innerHTML = '<option value="outro">Outro (especificar)</option>';
    if (outroGroup) outroGroup.style.display = '';
    return;
  }
  if (outroGroup) outroGroup.style.display = 'none';
  const list = STATE.equipamentos.filter(e => e.tipo === tipo && e.status === 'disponivel');
  sel.innerHTML = `<option value="">Selecione o equipamento...</option>
    ${list.map(e => `<option value="${e.id}" ${e.nome===selectedEquip?'selected':''}>${e.nome}</option>`).join('')}
    <option value="outro">Outro (especificar)</option>`;
  sel.addEventListener('change', () => {
    if (outroGroup) outroGroup.style.display = sel.value === 'outro' ? '' : 'none';
  });
}

function toggleOutroSala(sel) {
  const g = $('#res-outro-sala-group');
  if (g) g.style.display = sel.value === 'Outro' ? '' : 'none';
}

function changeQty(delta) {
  const input = $('#res-qtd');
  if (!input) return;
  const val = Math.max(1, Math.min(99, parseInt(input.value) + delta));
  input.value = val;
}

function editReserva(id) { openModalReserva(id); }

function salvarReserva(id) {
  const tipo = $('#res-tipo')?.value;
  const equipVal = $('#res-equip')?.value;
  const equipNome = equipVal === 'outro'
    ? ($('#res-outro-equip')?.value || '').trim()
    : STATE.equipamentos.find(e => e.id == equipVal)?.nome || equipVal;
  const cargo = $('#res-cargo')?.value;
  const nome = $('#res-nome')?.value.trim();
  const salaVal = $('#res-sala')?.value;
  const sala = salaVal === 'Outro' ? ($('#res-outro-sala')?.value || '').trim() : salaVal;
  const data = $('#res-data')?.value;
  const hinicio = $('#res-hinicio')?.value;
  const hfim = $('#res-hfim')?.value;
  const qtd = parseInt($('#res-qtd')?.value) || 1;

  if (!tipo || !equipNome || !cargo || !nome || !sala || !data || !hinicio || !hfim) {
    toast('Preencha todos os campos obrigatórios.', 'error'); return;
  }

  if (id) {
    const r = STATE.reservas.find(r => r.id === id);
    if (r) Object.assign(r, { equipamentoTipo: tipo, equipamento: equipNome, cargo, solicitante: nome, sala, dataInicio: data, horaInicio: hinicio, horaFim: hfim, quantidade: qtd });
    toast('Reserva atualizada!');
  } else {
    STATE.reservas.push({ id: STATE.nextId.reserva++, equipamentoTipo: tipo, equipamento: equipNome, cargo, solicitante: nome, sala, dataInicio: data, horaInicio: hinicio, horaFim: hfim, quantidade: qtd, status: 'ativo', criado: dateNow() });
    addNotification('Nova reserva criada', `${nome} reservou ${equipNome}`, 'ti-calendar-plus');
    toast('Reserva criada com sucesso!');
  }
  closeModal();
  renderPage(STATE.currentPage);
}

// ===== MODAL: NOVO CHAMADO =====
function openModalChamado(chamadoId = null) {
  const c = chamadoId ? STATE.chamados.find(c => c.id === chamadoId) : null;
  openModal(`
  <div class="modal modal-lg">
    <div class="modal-header">
      <span class="modal-title"><i class="ti ti-headset"></i> ${c ? 'Editar Chamado' : 'Novo Chamado'}</span>
      <button class="btn-icon" onclick="closeModal()"><i class="ti ti-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="required">Título do Chamado</label>
        <input type="text" id="ch-titulo" placeholder="Descreva o problema brevemente..." value="${c?.titulo||''}" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="required">Categoria</label>
          <select id="ch-cat">
            <option value="">Selecione...</option>
            ${['Hardware','Software','Rede','Impressora','Acesso/Senha','E-mail','Outros'].map(o=>`<option ${c?.categoria===o?'selected':''}>${o}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="required">Prioridade</label>
          <select id="ch-prio">
            ${['Baixa','Media','Alta'].map(p=>`<option ${c?.prioridade===p?'selected':''}>${p}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="required">Solicitante</label>
          <input type="text" id="ch-sol" placeholder="Nome do solicitante" value="${c?.solicitante||STATE.currentUser.nome}" />
        </div>
        <div class="form-group">
          <label>Atribuir a (TI)</label>
          <select id="ch-atrib">
            <option value="">Não atribuído</option>
            ${STATE.users.filter(u=>u.role==='admin').map(u=>`<option value="${u.nome}" ${c?.atribuido===u.nome?'selected':''}>${u.nome}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="required">Descrição Detalhada</label>
        <textarea id="ch-desc" placeholder="Descreva o problema com o máximo de detalhes possível...">${c?.descricao||''}</textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-primary" onclick="salvarChamado(${chamadoId||'null'})">
        <i class="ti ti-check"></i> ${c ? 'Salvar' : 'Abrir Chamado'}
      </button>
    </div>
  </div>`);
}

function editChamado(id) { openModalChamado(id); }

function salvarChamado(id) {
  const titulo = $('#ch-titulo')?.value.trim();
  const cat = $('#ch-cat')?.value;
  const prio = $('#ch-prio')?.value;
  const sol = $('#ch-sol')?.value.trim();
  const atrib = $('#ch-atrib')?.value;
  const desc = $('#ch-desc')?.value.trim();
  if (!titulo || !cat || !prio || !sol || !desc) { toast('Preencha todos os campos obrigatórios.', 'error'); return; }
  if (id) {
    const c = STATE.chamados.find(c => c.id === id);
    if (c) Object.assign(c, { titulo, categoria: cat, prioridade: prio, solicitante: sol, atribuido: atrib, descricao: desc, atualizado: dateNow() });
    toast('Chamado atualizado!');
  } else {
    STATE.chamados.push({ id: STATE.nextId.chamado++, titulo, categoria: cat, prioridade: prio, solicitante: sol, atribuido: atrib, descricao: desc, status: 'aberto', criado: dateNow(), atualizado: dateNow() });
    addNotification('Novo chamado aberto', titulo, 'ti-headset');
    toast('Chamado aberto com sucesso!');
  }
  closeModal();
  renderPage(STATE.currentPage);
}

// ===== MODAL: EQUIPAMENTO =====
function openModalEquipamento(equipId = null) {
  const e = equipId ? STATE.equipamentos.find(e => e.id === equipId) : null;
  openModal(`
  <div class="modal">
    <div class="modal-header">
      <span class="modal-title"><i class="ti ti-device-laptop"></i> ${e ? 'Editar Equipamento' : 'Novo Equipamento'}</span>
      <button class="btn-icon" onclick="closeModal()"><i class="ti ti-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="required">Nome do Equipamento</label>
        <input type="text" id="eq-nome" placeholder="Ex: Notebook Dell Inspiron 15" value="${e?.nome||''}" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="required">Tipo</label>
          <select id="eq-tipo">
            ${['Notebook','iPad','Projetor','Caixa de Som','Monitor','Impressora','Tablet','Switch','Roteador','Outro'].map(t=>`<option ${e?.tipo===t?'selected':''}>${t}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="required">Nº de Patrimônio</label>
          <input type="text" id="eq-pat" placeholder="Ex: NB-003" value="${e?.patrimonio||''}" />
        </div>
      </div>
      <div class="form-group">
        <label>Descrição / Especificações</label>
        <input type="text" id="eq-desc" placeholder="Ex: 16GB RAM, SSD 512GB" value="${e?.descricao||''}" />
      </div>
      <div class="form-group">
        <label>Status</label>
        <select id="eq-status">
          ${['disponivel','reservado','manutencao','inativo'].map(s=>`<option value="${s}" ${e?.status===s?'selected':''}>${s}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-primary" onclick="salvarEquipamento(${equipId||'null'})">
        <i class="ti ti-check"></i> Salvar
      </button>
    </div>
  </div>`);
}

function editEquipamento(id) { openModalEquipamento(id); }

function salvarEquipamento(id) {
  const nome = $('#eq-nome')?.value.trim();
  const tipo = $('#eq-tipo')?.value;
  const pat  = $('#eq-pat')?.value.trim();
  const desc = $('#eq-desc')?.value.trim();
  const status = $('#eq-status')?.value;
  if (!nome || !tipo || !pat) { toast('Preencha os campos obrigatórios.', 'error'); return; }
  if (id) {
    const e = STATE.equipamentos.find(e => e.id === id);
    if (e) Object.assign(e, { nome, tipo, patrimonio: pat, descricao: desc, status });
    toast('Equipamento atualizado!');
  } else {
    STATE.equipamentos.push({ id: STATE.nextId.equipamento++, nome, tipo, patrimonio: pat, descricao: desc, status });
    toast('Equipamento cadastrado!');
  }
  closeModal();
  renderPage('equipamentos');
}

// ===== MODAL: USUARIO =====
function openModalUsuario(userId = null) {
  const u = userId ? STATE.users.find(u => u.id === userId) : null;
  openModal(`
  <div class="modal">
    <div class="modal-header">
      <span class="modal-title"><i class="ti ti-user-plus"></i> ${u ? 'Editar Usuário' : 'Novo Usuário'}</span>
      <button class="btn-icon" onclick="closeModal()"><i class="ti ti-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="required">Nome Completo</label>
        <input type="text" id="usr-nome" placeholder="Nome completo do usuário" value="${u?.nome||''}" />
      </div>
      <div class="form-group">
        <label class="required">E-mail</label>
        <input type="email" id="usr-email" placeholder="email@escolamiro.com.br" value="${u?.email||''}" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="required">Nome de Usuário</label>
          <input type="text" id="usr-login" placeholder="sem espaços" value="${u?.usuario||''}" />
        </div>
        <div class="form-group">
          <label class="required">Perfil</label>
          <select id="usr-role">
            <option value="usuario" ${u?.role==='usuario'?'selected':''}>Usuário</option>
            <option value="admin" ${u?.role==='admin'?'selected':''}>Administrador</option>
          </select>
        </div>
      </div>
      ${!u ? `<div class="form-group">
        <label class="required">Senha</label>
        <input type="password" id="usr-senha" placeholder="Mínimo 6 caracteres" />
      </div>` : ''}
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-primary" onclick="salvarUsuario(${userId||'null'})">
        <i class="ti ti-check"></i> Salvar
      </button>
    </div>
  </div>`);
}

function editUsuario(id) { openModalUsuario(id); }

function salvarUsuario(id) {
  const nome  = $('#usr-nome')?.value.trim();
  const email = $('#usr-email')?.value.trim();
  const login = $('#usr-login')?.value.trim();
  const role  = $('#usr-role')?.value;
  const senha = $('#usr-senha')?.value || '123456';
  if (!nome || !email || !login) { toast('Preencha todos os campos obrigatórios.', 'error'); return; }
  if (id) {
    const u = STATE.users.find(u => u.id === id);
    if (u) Object.assign(u, { nome, email, usuario: login, role });
    toast('Usuário atualizado!');
  } else {
    if (STATE.users.find(u => u.usuario === login || u.email === email)) { toast('Usuário ou e-mail já existe.', 'error'); return; }
    STATE.users.push({ id: STATE.nextId.usuario++, nome, email, usuario: login, role, status: 'ativo', criado: dateNow() });
    addNotification('Novo usuário cadastrado', nome, 'ti-user-plus');
    toast('Usuário criado!');
  }
  closeModal();
  renderPage('usuarios');
}

// ===== TABS (arquivados page) =====
document.addEventListener('click', e => {
  if (e.target.matches('[data-arq]')) {
    $$('[data-arq]').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    const tab = e.target.dataset.arq;
    const content = $('#arq-content');
    if (content) content.innerHTML = tab === 'chamados' ? renderArqChamados() : renderArqReservas();
  }
});

// ===== PERSISTÊNCIA localStorage =====
function saveState() {
  try {
    localStorage.setItem('miro_ti_state', JSON.stringify({
      reservas: STATE.reservas,
      chamados: STATE.chamados,
      equipamentos: STATE.equipamentos,
      users: STATE.users,
      nextId: STATE.nextId,
      notifications: STATE.notifications.slice(0, 30),
    }));
  } catch(e) {}
}

function loadState() {
  try {
    const saved = localStorage.getItem('miro_ti_state');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.reservas)      STATE.reservas      = data.reservas;
      if (data.chamados)      STATE.chamados      = data.chamados;
      if (data.equipamentos)  STATE.equipamentos  = data.equipamentos;
      if (data.users)         STATE.users         = data.users;
      if (data.nextId)        STATE.nextId        = data.nextId;
      if (data.notifications) STATE.notifications = data.notifications;
    }
  } catch(e) {}
}

// Auto-save após cada ação relevante
const _origSalvarReserva   = salvarReserva;
const _origSalvarChamado   = salvarChamado;
const _origSalvarEquip     = salvarEquipamento;
const _origSalvarUser      = salvarUsuario;
const _origChangeRes       = changeReservaStatus;
const _origChangeCh        = changeChamadoStatus;
const _origDelRes          = deleteReserva;
const _origDelCh           = deleteChamado;
const _origDelEquip        = deleteEquipamento;
const _origDelUser         = deleteUsuario;
const _origToggleUser      = toggleUserStatus;

salvarReserva       = (...a) => { _origSalvarReserva(...a);   saveState(); };
salvarChamado       = (...a) => { _origSalvarChamado(...a);   saveState(); };
salvarEquipamento   = (...a) => { _origSalvarEquip(...a);     saveState(); };
salvarUsuario       = (...a) => { _origSalvarUser(...a);      saveState(); };
changeReservaStatus = (...a) => { _origChangeRes(...a);       saveState(); };
changeChamadoStatus = (...a) => { _origChangeCh(...a);        saveState(); };
deleteReserva       = (...a) => { _origDelRes(...a);          saveState(); };
deleteChamado       = (...a) => { _origDelCh(...a);           saveState(); };
deleteEquipamento   = (...a) => { _origDelEquip(...a);        saveState(); };
deleteUsuario       = (...a) => { _origDelUser(...a);         saveState(); };
toggleUserStatus    = (...a) => { _origToggleUser(...a);      saveState(); };

window.addEventListener('beforeunload', saveState);

// ===== INIT =====
loadState();
render();
