/* ============================================================
   TI - ESCOLA MIRÓ | Sistema de Chamados e Reservas v2
   Responsável: Tiago Souza
   ============================================================ */

// ===== STATE =====
const STATE = {
  currentUser: null,
  currentPage: 'dashboard',
  notifications: [],
  users: [
    { id: 1, nome: 'Tiago Souza', email: 'tiago@escolamiro.com.br', usuario: 'tiago.souza', senha: 'admin123', role: 'admin', status: 'ativo', unidade: 'Matriz', criado: '2024-01-15' },
    { id: 2, nome: 'Ana Paula Silva', email: 'ana@escolamiro.com.br', usuario: 'ana.silva', senha: '123456', role: 'usuario', status: 'ativo', unidade: 'Matriz', criado: '2024-02-10' },
    { id: 3, nome: 'Carlos Mendes', email: 'carlos@escolamiro.com.br', usuario: 'carlos.mendes', senha: '123456', role: 'usuario', status: 'ativo', unidade: 'Ensino Médio', criado: '2024-03-05' },
  ],
  equipamentos: [
    { id: 1, nome: 'Notebook Dell Inspiron 15', tipo: 'Notebook', patrimonio: 'NB-001', status: 'disponivel', descricao: '16GB RAM, SSD 512GB', unidade: 'Matriz', local: 'Lab. Informática', marca: 'Dell', modelo: 'Inspiron 15', serie: 'DL20240001' },
    { id: 2, nome: 'Notebook Lenovo ThinkPad', tipo: 'Notebook', patrimonio: 'NB-002', status: 'reservado', descricao: 'Intel Core i5, 8GB RAM', unidade: 'Matriz', local: 'Sala dos Professores', marca: 'Lenovo', modelo: 'ThinkPad E15', serie: 'LN20240002' },
    { id: 3, nome: 'iPad Pro 12.9"', tipo: 'iPad', patrimonio: 'IP-001', status: 'disponivel', descricao: 'Wi-Fi, 256GB, iPadOS 17', unidade: 'Matriz', local: 'Depósito TI', marca: 'Apple', modelo: 'iPad Pro 12.9 M2', serie: 'AP20240003' },
    { id: 4, nome: 'iPad Air 5ª Geração', tipo: 'iPad', patrimonio: 'IP-002', status: 'manutencao', descricao: 'Wi-Fi, 64GB', unidade: 'Matriz', local: 'Manutenção', marca: 'Apple', modelo: 'iPad Air 5', serie: 'AP20240004' },
    { id: 5, nome: 'Projetor Epson S41', tipo: 'Projetor', patrimonio: 'PJ-001', status: 'disponivel', descricao: '3300 Lumens, HDMI/VGA', unidade: 'Matriz', local: 'Sala 101', marca: 'Epson', modelo: 'S41+', serie: 'EP20240005' },
    { id: 6, nome: 'Notebook Dell XPS', tipo: 'Notebook', patrimonio: 'NB-EM-001', status: 'disponivel', descricao: 'Intel i7, 16GB, SSD 256GB', unidade: 'Ensino Médio', local: 'Sala TI', marca: 'Dell', modelo: 'XPS 13', serie: 'DL20240010' },
  ],
  reservas: [
    { id: 1, equipamentoTipo: 'Notebook', equipamento: 'Notebook Dell Inspiron 15', solicitante: 'Ana Paula Silva', cargo: 'Professor(a)', sala: '3º Ano', dataInicio: dateNow(), horaInicio: '08:00', horaFim: '12:00', quantidade: 1, status: 'ativo', unidade: 'Matriz', criado: dateNow(), obs: '' },
    { id: 2, equipamentoTipo: 'iPad', equipamento: 'iPad Pro 12.9"', solicitante: 'Carlos Mendes', cargo: 'Coordenador(a)', sala: '5º Ano', dataInicio: dateNow(), horaInicio: '13:00', horaFim: '17:00', quantidade: 3, status: 'ativo', unidade: 'Matriz', criado: dateNow(), obs: '' },
    { id: 3, equipamentoTipo: 'Projetor', equipamento: 'Projetor Epson S41', solicitante: 'Ana Paula Silva', cargo: 'Professor(a)', sala: '1º Ano EM', dataInicio: '2025-05-20', horaInicio: '09:00', horaFim: '11:00', quantidade: 1, status: 'fechado', unidade: 'Matriz', criado: '2025-05-19', obs: '' },
  ],
  chamados: [
    { id: 1, titulo: 'Notebook sem áudio', descricao: 'O notebook da sala 3 não está produzindo som nas aulas.', categoria: 'Hardware', prioridade: 'Media', solicitante: 'Ana Paula Silva', atribuido: 'Tiago Souza', status: 'andamento', unidade: 'Matriz', criado: dateNow(), atualizado: dateNow() },
    { id: 2, titulo: 'Impressora offline', descricao: 'A impressora da secretaria parou de funcionar.', categoria: 'Hardware', prioridade: 'Alta', solicitante: 'Carlos Mendes', atribuido: 'Tiago Souza', status: 'aberto', unidade: 'Matriz', criado: dateNow(), atualizado: dateNow() },
    { id: 3, titulo: 'Acesso ao Wi-Fi negado', descricao: 'Professores não conseguem acessar a rede Wi-Fi.', categoria: 'Rede', prioridade: 'Alta', solicitante: 'Ana Paula Silva', atribuido: '', status: 'aberto', unidade: 'Ensino Médio', criado: dateNow(), atualizado: dateNow() },
    { id: 4, titulo: 'Instalação de software', descricao: 'Preciso do LibreOffice instalado no laboratório.', categoria: 'Software', prioridade: 'Baixa', solicitante: 'Carlos Mendes', atribuido: 'Tiago Souza', status: 'fechado', unidade: 'Matriz', criado: '2025-05-28', atualizado: '2025-05-30' },
  ],
  inventario: [
    { id: 1, nome: 'Switch HP 24 portas', categoria: 'Rede', tipo: 'Switch', patrimonio: 'NET-001', marca: 'HP', modelo: 'OfficeConnect 1420', serie: 'HP20240001', local: 'Rack Principal', status: 'ativo', unidade: 'Matriz', ip: '192.168.1.1', garantia: '2026-12-01', obs: 'Rack sala de servidores' },
    { id: 2, nome: 'Impressora HP LaserJet', categoria: 'Impressora', tipo: 'Laser', patrimonio: 'IMP-001', marca: 'HP', modelo: 'LaserJet Pro M404n', serie: 'HP20240002', local: 'Secretaria', status: 'ativo', unidade: 'Matriz', ip: '192.168.1.50', garantia: '2025-08-01', obs: '' },
    { id: 3, nome: 'Roteador Cisco', categoria: 'Rede', tipo: 'Roteador', patrimonio: 'NET-002', marca: 'Cisco', modelo: 'RV340', serie: 'CS20240001', local: 'Rack Principal', status: 'ativo', unidade: 'Matriz', ip: '192.168.1.254', garantia: '2027-03-15', obs: 'Gateway principal' },
  ],
  licencas: [
    { id: 1, nome: 'Microsoft 365 Education', fornecedor: 'Microsoft', tipo: 'SaaS', quantidade: 50, chave: 'XXXXX-XXXXX-XXXXX', dataCompra: '2024-01-01', vencimento: '2025-12-31', valor: 2500.00, status: 'ativo', unidade: 'Matriz', obs: 'Inclui Teams, Word, Excel, PowerPoint' },
    { id: 2, nome: 'Adobe Creative Cloud', fornecedor: 'Adobe', tipo: 'Desktop', quantidade: 5, chave: 'ADOBE-XXXXX', dataCompra: '2024-03-01', vencimento: '2025-06-15', valor: 1800.00, status: 'vencendo', unidade: 'Matriz', obs: 'Laboratório de artes' },
    { id: 3, nome: 'Windows 11 Pro', fornecedor: 'Microsoft', tipo: 'OEM', quantidade: 20, chave: 'WIN11-XXXXX', dataCompra: '2023-06-01', vencimento: '9999-12-31', valor: 8000.00, status: 'ativo', unidade: 'Ensino Médio', obs: 'Licenças perpétuas' },
  ],
  nextId: { reserva: 4, chamado: 5, usuario: 4, equipamento: 7, inventario: 4, licenca: 4 },
};

function dateNow() { return new Date().toISOString().split('T')[0]; }
function formatDate(d) { if (!d || d === '9999-12-31') return d === '9999-12-31' ? 'Perpétua' : '-'; const [y,m,day] = d.split('-'); return `${day}/${m}/${y}`; }
function initials(nome) { return nome.split(' ').slice(0,2).map(n=>n[0]).join('').toUpperCase(); }
const $ = (s,c=document) => c.querySelector(s);
const $$ = (s,c=document) => [...c.querySelectorAll(s)];

// ===== TOAST =====
function toast(msg, type='success') {
  const icons = {success:'ti-circle-check', error:'ti-alert-circle', info:'ti-info-circle', warning:'ti-alert-triangle'};
  let tc = $('#toast-container');
  if (!tc) { tc = document.createElement('div'); tc.id='toast-container'; tc.className='toast-container'; document.body.appendChild(tc); }
  const t = document.createElement('div');
  t.className=`toast toast-${type}`;
  t.innerHTML=`<i class="ti ${icons[type]} toast-icon"></i><span class="toast-msg">${msg}</span>`;
  tc.appendChild(t);
  setTimeout(()=>t.remove(), 3500);
}

function openModal(html, id='main-modal') {
  let o = $(`#${id}`); if(o) o.remove();
  o = document.createElement('div'); o.id=id; o.className='modal-overlay'; o.innerHTML=html;
  document.body.appendChild(o);
  o.addEventListener('click', e=>{ if(e.target===o) closeModal(id); });
}
function closeModal(id='main-modal') { const e=$(`#${id}`); if(e) e.remove(); }

// ===== PERSISTENCE =====
function saveState() {
  try { localStorage.setItem('miro_ti_v2', JSON.stringify({ reservas:STATE.reservas, chamados:STATE.chamados, equipamentos:STATE.equipamentos, users:STATE.users, inventario:STATE.inventario, licencas:STATE.licencas, nextId:STATE.nextId, notifications:STATE.notifications.slice(0,30) })); } catch(e) {}
}
function loadState() {
  try {
    const s = localStorage.getItem('miro_ti_v2');
    if (s) { const d=JSON.parse(s); ['reservas','chamados','equipamentos','users','inventario','licencas','nextId','notifications'].forEach(k=>{ if(d[k]) STATE[k]=d[k]; }); }
  } catch(e) {}
}
window.addEventListener('beforeunload', saveState);

// ===== NOTIFICATIONS =====
function addNotification(titulo, sub, icon='ti-info-circle') {
  STATE.notifications.unshift({ titulo, sub, icon, data: dateNow(), lida: false });
  updateNotifBadge();
}
function updateNotifBadge() {
  const unread = STATE.notifications.filter(n=>!n.lida).length;
  const dot = $('.notification-dot');
  if (dot) dot.style.display = unread > 0 ? '' : 'none';
  const badge = $('.nav-badge[data-badge="chamados"]');
  if (badge) badge.textContent = STATE.chamados.filter(c=>c.status==='aberto').length;
}

// ===== RENDER =====
function render() {
  const app = $('#app');
  if (!STATE.currentUser) { app.innerHTML = renderAuth(); attachAuthEvents(); }
  else { app.innerHTML = renderLayout(); attachLayoutEvents(); renderPage(STATE.currentPage); updateNotifBadge(); }
}

// ===== AUTH (sem cadastro público) =====
function renderAuth() {
  return `
  <div class="auth-wrapper">
    <div class="auth-card">
      <div class="auth-logo">
        <img src="logo.png" alt="Escola Miró" class="auth-logo-img-real" onerror="this.style.display='none'">
        <h1>TI — Escola Miró</h1>
        <p>Sistema de Chamados e Reservas</p>
      </div>
      <div class="form-group">
        <label>Usuário</label>
        <div class="input-icon"><i class="ti ti-user"></i><input id="login-user" type="text" placeholder="seu.usuario" /></div>
      </div>
      <div class="form-group">
        <label>Senha</label>
        <div class="input-icon"><i class="ti ti-lock"></i><input id="login-pass" type="password" placeholder="••••••••" /></div>
      </div>
      <button class="btn btn-primary btn-full" id="btn-login"><i class="ti ti-login"></i> Entrar no sistema</button>
      <p style="text-align:center;margin-top:20px;font-size:12px;color:var(--gray-400)">
        Problemas de acesso? Fale com o TI:<br><strong>Tiago Souza</strong>
      </p>
    </div>
  </div>`;
}

function attachAuthEvents() {
  $('#btn-login').addEventListener('click', doLogin);
  $('#login-pass').addEventListener('keydown', e=>{ if(e.key==='Enter') doLogin(); });
}

function doLogin() {
  const u = $('#login-user').value.trim();
  const p = $('#login-pass').value;
  const found = STATE.users.find(usr => (usr.usuario===u || usr.email===u) && usr.senha===p && usr.status==='ativo');
  if (!found) { toast('Usuário ou senha inválidos.', 'error'); return; }
  STATE.currentUser = found;
  render();
  toast(`Bem-vindo, ${found.nome.split(' ')[0]}!`);
}

// ===== LAYOUT =====
function renderLayout() {
  const u = STATE.currentUser;
  const isAdmin = u.role === 'admin';
  const openCh = STATE.chamados.filter(c=>c.status==='aberto').length;
  const unreadNotifs = STATE.notifications.filter(n=>!n.lida).length;
  const licVencendo = STATE.licencas.filter(l=>l.status==='vencendo'||diasParaVencer(l.vencimento)<=30).length;

  return `
  <div class="app-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <img src="logo.png" alt="Miró" class="sidebar-logo-img" onerror="this.outerHTML='<div class=\'sidebar-logo-icon\'><i class=\'ti ti-device-desktop\'></i></div>'">
          <div class="sidebar-logo-text"><h2>TI — Escola Miró</h2><span>Tiago Souza</span></div>
        </div>
      </div>
      <div class="sidebar-user">
        <div class="sidebar-avatar">${initials(u.nome)}</div>
        <div class="sidebar-user-info"><h4>${u.nome.split(' ').slice(0,2).join(' ')}</h4><span>${isAdmin?'Administrador':'Usuário'}</span></div>
      </div>
      <nav class="sidebar-nav">
        ${isAdmin ? `
        <span class="nav-section-title">Geral</span>
        <button class="nav-item ${STATE.currentPage==='dashboard'?'active':''}" data-page="dashboard"><i class="ti ti-layout-dashboard"></i> Dashboard</button>
        <button class="nav-item ${STATE.currentPage==='calendario'?'active':''}" data-page="calendario"><i class="ti ti-calendar-month"></i> Calendário</button>
        <button class="nav-item ${STATE.currentPage==='reservas'?'active':''}" data-page="reservas"><i class="ti ti-calendar-event"></i> Reservas</button>
        <button class="nav-item ${STATE.currentPage==='chamados'?'active':''}" data-page="chamados">
          <i class="ti ti-headset"></i> Chamados
          ${openCh>0?`<span class="nav-badge" data-badge="chamados">${openCh}</span>`:''}
        </button>
        <button class="nav-item ${STATE.currentPage==='arquivados'?'active':''}" data-page="arquivados"><i class="ti ti-archive"></i> Arquivados</button>
        <span class="nav-section-title">Infraestrutura</span>
        <button class="nav-item ${STATE.currentPage==='inventario'?'active':''}" data-page="inventario"><i class="ti ti-server"></i> Inventário TI</button>
        <button class="nav-item ${STATE.currentPage==='licencas'?'active':''}" data-page="licencas">
          <i class="ti ti-license"></i> Licenças
          ${licVencendo>0?`<span class="nav-badge" style="background:var(--warning)">${licVencendo}</span>`:''}
        </button>
        <span class="nav-section-title">Unidades</span>
        <button class="nav-item ${STATE.currentPage==='matriz'?'active':''}" data-page="matriz"><i class="ti ti-building-school"></i> Matriz</button>
        <button class="nav-item ${STATE.currentPage==='ensinomedio'?'active':''}" data-page="ensinomedio"><i class="ti ti-building"></i> Ensino Médio</button>
        <span class="nav-section-title">Administração</span>
        <button class="nav-item ${STATE.currentPage==='equipamentos'?'active':''}" data-page="equipamentos"><i class="ti ti-devices"></i> Equipamentos</button>
        <button class="nav-item ${STATE.currentPage==='usuarios'?'active':''}" data-page="usuarios"><i class="ti ti-users"></i> Usuários</button>
        <button class="nav-item ${STATE.currentPage==='relatorios'?'active':''}" data-page="relatorios"><i class="ti ti-chart-bar"></i> Relatórios</button>
        ` : `
        <span class="nav-section-title">Menu</span>
        <button class="nav-item ${STATE.currentPage==='novaReserva'?'active':''}" data-page="novaReserva"><i class="ti ti-calendar-plus"></i> Nova Reserva</button>
        <button class="nav-item ${STATE.currentPage==='novoChamado'?'active':''}" data-page="novoChamado"><i class="ti ti-headset"></i> Abrir Chamado</button>
        <button class="nav-item ${STATE.currentPage==='meuschamados'?'active':''}" data-page="meuschamados"><i class="ti ti-list-check"></i> Meus Chamados</button>
        `}
      </nav>
      <div class="sidebar-footer">
        <button class="nav-item" id="btn-logout" style="color:rgba(255,255,255,.5)"><i class="ti ti-logout"></i> Sair</button>
      </div>
    </aside>
    <div class="main-content">
      <header class="main-header">
        <h1 class="page-title" id="page-title">Dashboard</h1>
        <div class="header-actions">
          ${isAdmin ? `
          <div style="position:relative">
            <button class="btn-icon" id="notif-btn" title="Notificações">
              <i class="ti ti-bell" style="font-size:20px"></i>
              <span class="notification-dot" style="display:${unreadNotifs>0?'':'none'}"></span>
            </button>
          </div>` : ''}
          <button class="btn btn-primary btn-sm" id="btn-new-action"><i class="ti ti-plus"></i> Novo</button>
        </div>
      </header>
      <main class="page-content" id="page-content"></main>
    </div>
  </div>`;
}

function attachLayoutEvents() {
  $$('.nav-item[data-page]').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.page));
  });
  $('#btn-logout').addEventListener('click', ()=>{ STATE.currentUser=null; STATE.currentPage='dashboard'; render(); });
  const notifBtn = $('#notif-btn');
  if (notifBtn) notifBtn.addEventListener('click', e=>{ e.stopPropagation(); showNotifPanel(); });
  $('#btn-new-action').addEventListener('click', ()=>{
    const p = STATE.currentPage;
    if (['dashboard','reservas','calendario','novaReserva'].includes(p)) openModalReserva();
    else if (['chamados','novoChamado'].includes(p)) openModalChamado();
    else if (p==='inventario') openModalInventario();
    else if (p==='licencas') openModalLicenca();
    else if (p==='equipamentos'||p==='matriz'||p==='ensinomedio') openModalEquipamento();
    else if (p==='usuarios') openModalUsuario();
    else openModalReserva();
  });
}

function navigateTo(page) {
  STATE.currentPage = page;
  const titles = { dashboard:'Dashboard', calendario:'Calendário', reservas:'Reservas', chamados:'Chamados', arquivados:'Arquivados', inventario:'Inventário TI', licencas:'Licenças de Software', matriz:'Matriz — Equipamentos', ensinomedio:'Ensino Médio — Equipamentos', equipamentos:'Equipamentos', usuarios:'Usuários', relatorios:'Relatórios & Gráficos', novaReserva:'Nova Reserva', novoChamado:'Abrir Chamado', meuschamados:'Meus Chamados' };
  const titleEl = $('#page-title');
  if (titleEl) titleEl.textContent = titles[page] || page;
  $$('.nav-item[data-page]').forEach(b=>b.classList.toggle('active', b.dataset.page===page));
  renderPage(page);
}

function renderPage(page) {
  const content = $('#page-content');
  if (!content) return;
  const pages = { dashboard, calendario, reservas, chamados, arquivados, inventario, licencas, matriz, ensinomedio, equipamentos, usuarios, relatorios, novaReserva, novoChamado, meuschamados };
  content.innerHTML = pages[page] ? pages[page]() : '<p>Página não encontrada.</p>';
  attachPageEvents(page);
}

function attachPageEvents(page) {
  if (page==='dashboard') setTimeout(()=>{ renderChartStatus(); renderChartCat(); }, 100);
  if (page==='reservas') attachTableFilter('search-reserva', 'filter-reserva-status', 'reservas-tbody', ()=>renderReservasRows(getFilteredReservas()));
  if (page==='chamados') attachTableFilter('search-chamado', 'filter-chamado-status', 'chamados-tbody', ()=>renderChamadosRows(getFilteredChamados()));
  if (page==='usuarios') attachTableFilter('search-user', 'filter-user-status', 'users-tbody', ()=>renderUserRows(STATE.users));
  if (page==='equipamentos') attachEquipFilter();
  if (page==='inventario') attachInvFilter();
  if (page==='relatorios') setTimeout(renderRelatorioCharts, 200);
  if (page==='calendario') renderCalendario();
  if (page==='matriz') attachUnidadeFilter('Matriz');
  if (page==='ensinomedio') attachUnidadeFilter('Ensino Médio');
}

function attachTableFilter(searchId, filterId, tbodyId, getFn) {
  const s=$(`#${searchId}`), f=$(`#${filterId}`);
  if(s) s.addEventListener('input', ()=>{ const el=$(`#${tbodyId}`); if(el) el.innerHTML=getFn(); });
  if(f) f.addEventListener('change', ()=>{ const el=$(`#${tbodyId}`); if(el) el.innerHTML=getFn(); });
}

// ===== NOTIFICATION PANEL =====
function showNotifPanel() {
  const existing=$('.notif-panel'); if(existing){existing.remove();return;}
  const panel=document.createElement('div'); panel.className='notif-panel';
  panel.innerHTML=`
    <div class="notif-header"><span>Notificações</span>
      <button class="btn-icon" onclick="STATE.notifications.forEach(n=>n.lida=true);this.closest('.notif-panel').remove();updateNotifBadge();saveState();" title="Marcar todas lidas"><i class="ti ti-checks" style="font-size:14px"></i></button>
    </div>
    ${STATE.notifications.length===0 ? '<p style="padding:20px;text-align:center;font-size:12px;color:var(--gray-400)">Nenhuma notificação</p>'
      : STATE.notifications.slice(0,10).map(n=>`
      <div class="notif-item ${!n.lida?'unread':''}">
        <div class="notif-icon"><i class="ti ${n.icon}"></i></div>
        <div class="notif-text"><div class="notif-title">${n.titulo}</div><div class="notif-sub">${n.sub} · ${formatDate(n.data)}</div></div>
      </div>`).join('')}`;
  $('#notif-btn').parentElement.appendChild(panel);
  STATE.notifications.forEach(n=>n.lida=true);
  setTimeout(updateNotifBadge,100);
  document.addEventListener('click',()=>panel.remove(),{once:true});
}

// ===== DASHBOARD =====
function dashboard() {
  const hoje = dateNow();
  const reservasHoje = STATE.reservas.filter(r=>r.dataInicio===hoje && r.status==='ativo');
  const abertos = STATE.chamados.filter(c=>c.status==='aberto').length;
  const andamento = STATE.chamados.filter(c=>c.status==='andamento').length;
  const fechados = STATE.chamados.filter(c=>c.status==='fechado').length;
  const reservasAtivas = STATE.reservas.filter(r=>r.status==='ativo').length;
  const licVencendo = STATE.licencas.filter(l=>diasParaVencer(l.vencimento)<=30 && l.status!=='expirado').length;

  return `
  <div class="stats-grid">
    <div class="stat-card clickable" onclick="navigateTo('reservas')">
      <div class="stat-icon blue"><i class="ti ti-calendar-event"></i></div>
      <div class="stat-info"><div class="stat-number">${reservasAtivas}</div><div class="stat-label">Reservas Ativas</div></div>
      <i class="ti ti-arrow-right stat-arrow"></i>
    </div>
    <div class="stat-card clickable" onclick="navigateTo('chamados')">
      <div class="stat-icon red"><i class="ti ti-alert-circle"></i></div>
      <div class="stat-info"><div class="stat-number">${abertos}</div><div class="stat-label">Chamados Abertos</div></div>
      <i class="ti ti-arrow-right stat-arrow"></i>
    </div>
    <div class="stat-card clickable" onclick="navigateTo('chamados')">
      <div class="stat-icon orange"><i class="ti ti-loader"></i></div>
      <div class="stat-info"><div class="stat-number">${andamento}</div><div class="stat-label">Em Andamento</div></div>
      <i class="ti ti-arrow-right stat-arrow"></i>
    </div>
    <div class="stat-card clickable" onclick="navigateTo('arquivados')">
      <div class="stat-icon green"><i class="ti ti-circle-check"></i></div>
      <div class="stat-info"><div class="stat-number">${fechados}</div><div class="stat-label">Chamados Fechados</div></div>
      <i class="ti ti-arrow-right stat-arrow"></i>
    </div>
    <div class="stat-card clickable" onclick="navigateTo('inventario')">
      <div class="stat-icon teal"><i class="ti ti-server"></i></div>
      <div class="stat-info"><div class="stat-number">${STATE.inventario.length}</div><div class="stat-label">Itens no Inventário</div></div>
      <i class="ti ti-arrow-right stat-arrow"></i>
    </div>
    <div class="stat-card clickable" onclick="navigateTo('licencas')" style="${licVencendo>0?'border-color:var(--warning)':''}">
      <div class="stat-icon" style="background:${licVencendo>0?'var(--warning-bg)':'#ede9fe'};color:${licVencendo>0?'var(--warning)':'#7b1fa2'}"><i class="ti ti-license"></i></div>
      <div class="stat-info"><div class="stat-number">${licVencendo}</div><div class="stat-label">Licenças a Vencer</div></div>
      <i class="ti ti-arrow-right stat-arrow"></i>
    </div>
  </div>

  <!-- RESERVAS DO DIA EM DESTAQUE -->
  <div class="card mb-20" style="border-left:4px solid var(--primary)">
    <div class="card-header" style="background:var(--primary-light)">
      <span class="card-title"><i class="ti ti-calendar-today" style="color:var(--primary)"></i> Reservas de Hoje — ${new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'})}</span>
      <button class="btn btn-primary btn-sm" onclick="openModalReserva()"><i class="ti ti-plus"></i> Nova Reserva</button>
    </div>
    <div class="card-body" style="padding:0">
      ${reservasHoje.length===0
        ? '<div class="empty-state"><i class="ti ti-calendar-off"></i><h3>Nenhuma reserva para hoje</h3><p>Clique em "Nova Reserva" para criar.</p></div>'
        : `<table style="width:100%">
            <thead><tr>
              <th>Equipamento</th><th>Solicitante</th><th>Cargo</th><th>Turma/Sala</th><th>Horário</th><th>Qtd</th><th>Unidade</th><th>Status</th><th>Ações</th>
            </tr></thead>
            <tbody>
              ${reservasHoje.map(r=>`
              <tr>
                <td><strong>${r.equipamento}</strong><br><span class="text-muted">${r.equipamentoTipo}</span></td>
                <td>${r.solicitante}</td>
                <td><span class="text-muted">${r.cargo}</span></td>
                <td><strong>${r.sala}</strong></td>
                <td><span class="badge badge-reservado">${r.horaInicio} – ${r.horaFim}</span></td>
                <td><strong>${r.quantidade}</strong></td>
                <td>${r.unidade||'Matriz'}</td>
                <td><span class="badge badge-${r.status}">${r.status}</span></td>
                <td>
                  <div style="display:flex;gap:4px">
                    <button class="btn-icon" onclick="editReserva(${r.id})" title="Editar"><i class="ti ti-edit"></i></button>
                    <button class="btn-icon" onclick="changeReservaStatus(${r.id},'fechado');renderPage('dashboard')" title="Fechar" style="color:var(--success)"><i class="ti ti-check"></i></button>
                  </div>
                </td>
              </tr>`).join('')}
            </tbody>
          </table>`}
    </div>
  </div>

  <div class="grid-2">
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="ti ti-chart-donut"></i> Status dos Chamados</span></div>
      <div class="card-body"><div class="chart-container"><canvas id="chart-status"></canvas></div></div>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="card-title"><i class="ti ti-headset"></i> Chamados Recentes</span>
        <button class="btn btn-primary btn-sm" onclick="openModalChamado()"><i class="ti ti-plus"></i> Novo</button>
      </div>
      <div class="card-body" style="padding:0">
        ${STATE.chamados.filter(c=>c.status!=='fechado').slice(0,5).map(c=>`
        <div class="today-item" style="padding:12px 16px">
          <div class="today-item-icon" style="background:${c.prioridade==='Alta'?'var(--danger-bg)':'var(--warning-bg)'};color:${c.prioridade==='Alta'?'var(--danger)':'var(--warning)'}"><i class="ti ti-urgent"></i></div>
          <div class="today-item-info">
            <div class="today-item-title">${c.titulo}</div>
            <div class="today-item-sub">${c.solicitante} · ${c.categoria} · ${c.unidade||'Matriz'}</div>
          </div>
          <span class="badge badge-${c.status}">${c.status}</span>
        </div>`).join('') || '<div class="empty-state" style="padding:30px"><i class="ti ti-mood-happy"></i><h3>Sem chamados ativos</h3></div>'}
      </div>
    </div>
  </div>`;
}

function renderChartStatus() {
  const ctx=document.getElementById('chart-status'); if(!ctx) return;
  new Chart(ctx, { type:'doughnut', data:{ labels:['Aberto','Em Andamento','Fechado','Suspenso'], datasets:[{ data:[STATE.chamados.filter(c=>c.status==='aberto').length, STATE.chamados.filter(c=>c.status==='andamento').length, STATE.chamados.filter(c=>c.status==='fechado').length, STATE.chamados.filter(c=>c.status==='suspenso').length], backgroundColor:['#e74c3c','#e67e22','#27ae60','#95a5a6'], borderWidth:0 }] }, options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'bottom', labels:{ font:{ family:'Nunito', size:12 } } } } } });
}
function renderChartCat() {
  const ctx=document.getElementById('chart-cat'); if(!ctx) return;
  const cats={};
  STATE.chamados.forEach(c=>{ cats[c.categoria]=(cats[c.categoria]||0)+1; });
  new Chart(ctx, { type:'bar', data:{ labels:Object.keys(cats), datasets:[{ label:'Chamados', data:Object.values(cats), backgroundColor:'#0073c8', borderRadius:6 }] }, options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ display:false } }, scales:{ y:{ beginAtZero:true, ticks:{ stepSize:1 } } } } });
}

// ===== CALENDÁRIO =====
function calendario() {
  const now = new Date();
  return `
  <div class="filter-bar">
    <button class="btn btn-ghost" id="cal-prev"><i class="ti ti-chevron-left"></i></button>
    <span id="cal-title" style="font-size:16px;font-weight:700;min-width:200px;text-align:center"></span>
    <button class="btn btn-ghost" id="cal-next"><i class="ti ti-chevron-right"></i></button>
    <span style="flex:1"></span>
    <button class="btn btn-primary" onclick="openModalReserva()"><i class="ti ti-calendar-plus"></i> Nova Reserva</button>
    <button class="btn btn-ghost" onclick="openModalChamado()"><i class="ti ti-headset"></i> Novo Chamado</button>
  </div>
  <div class="card">
    <div id="cal-grid"></div>
  </div>
  <div class="card mt-16">
    <div class="card-header"><span class="card-title"><i class="ti ti-list"></i> Reservas do Mês</span></div>
    <div id="cal-list"></div>
  </div>`;
}

function renderCalendario() {
  if (!$('#cal-grid')) return;
  let current = new Date();
  function build() {
    const y=current.getFullYear(), m=current.getMonth();
    const title=$('#cal-title'); if(title) title.textContent=current.toLocaleDateString('pt-BR',{month:'long',year:'numeric'}).replace(/^\w/,c=>c.toUpperCase());
    const first=new Date(y,m,1).getDay();
    const days=new Date(y,m+1,0).getDate();
    const weeks=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
    let html=`<div style="display:grid;grid-template-columns:repeat(7,1fr);border-bottom:1px solid var(--gray-200)">
      ${weeks.map(w=>`<div style="padding:10px;text-align:center;font-size:11px;font-weight:700;color:var(--gray-500);text-transform:uppercase">${w}</div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr)">`;
    for(let i=0;i<first;i++) html+=`<div class="cal-day empty"></div>`;
    const todayStr=dateNow();
    for(let d=1;d<=days;d++){
      const ds=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const dayRes=STATE.reservas.filter(r=>r.dataInicio===ds && r.status==='ativo');
      const isToday=ds===todayStr;
      html+=`<div class="cal-day ${isToday?'today':''}" style="min-height:80px;border-right:1px solid var(--gray-100);border-bottom:1px solid var(--gray-100);padding:6px;cursor:pointer" onclick="openModalReservaData('${ds}')">
        <div style="font-size:13px;font-weight:${isToday?700:500};color:${isToday?'white':'var(--gray-700)'};background:${isToday?'var(--primary)':''};width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:4px">${d}</div>
        ${dayRes.slice(0,2).map(r=>`<div class="cal-event" title="${r.equipamento} — ${r.solicitante}">${r.equipamento.split(' ')[0]}</div>`).join('')}
        ${dayRes.length>2?`<div style="font-size:10px;color:var(--primary);font-weight:600">+${dayRes.length-2} mais</div>`:''}
      </div>`;
    }
    html+='</div>';
    $('#cal-grid').innerHTML=html;
    const list=STATE.reservas.filter(r=>{ const rd=new Date(r.dataInicio); return rd.getFullYear()===y && rd.getMonth()===m && r.status==='ativo'; });
    const calList=$('#cal-list');
    if(calList) calList.innerHTML=list.length===0?'<div class="empty-state"><i class="ti ti-calendar-off"></i><h3>Nenhuma reserva este mês</h3></div>':`<div class="table-wrapper"><table><thead><tr><th>Data</th><th>Equipamento</th><th>Solicitante</th><th>Sala</th><th>Horário</th><th>Status</th></tr></thead><tbody>${list.map(r=>`<tr><td>${formatDate(r.dataInicio)}</td><td>${r.equipamento}</td><td>${r.solicitante}</td><td>${r.sala}</td><td>${r.horaInicio}–${r.horaFim}</td><td><span class="badge badge-${r.status}">${r.status}</span></td></tr>`).join('')}</tbody></table></div>`;
  }
  build();
  const prev=$('#cal-prev'), next=$('#cal-next');
  if(prev) prev.addEventListener('click',()=>{ current=new Date(current.getFullYear(),current.getMonth()-1,1); build(); });
  if(next) next.addEventListener('click',()=>{ current=new Date(current.getFullYear(),current.getMonth()+1,1); build(); });
}

function openModalReservaData(ds) { openModalReserva(null, ds); }

// ===== RESERVAS =====
const CARGOS=['Professor(a)','Coordenador(a)','Assistente','Estagiário(a)','Administrativo'];
const SALAS=['Grupo 1','Grupo 2','Grupo 3','Grupo 4','Grupo 5','1º Ano','2º Ano','3º Ano','4º Ano','5º Ano','6º Ano','7º Ano','8º Ano','9º Ano','1º Ano EM','2º Ano EM','3º Ano EM','Outro'];
const HORAS=Array.from({length:24},(_,i)=>`${String(i).padStart(2,'0')}:00`);

function getFilteredReservas() {
  const q=($('#search-reserva')?.value||'').toLowerCase();
  const st=$('#filter-reserva-status')?.value||'';
  return STATE.reservas.filter(r=>(!q||r.equipamento.toLowerCase().includes(q)||r.solicitante.toLowerCase().includes(q))&&(!st||r.status===st));
}

function reservas() {
  return `
  <div class="filter-bar">
    <div class="search-bar"><i class="ti ti-search"></i><input type="text" placeholder="Buscar reserva..." id="search-reserva"/></div>
    <select class="filter-select" id="filter-reserva-status">
      <option value="">Todos os status</option>
      <option value="ativo">Ativo</option><option value="suspenso">Suspenso</option><option value="fechado">Fechado</option><option value="cancelado">Cancelado</option>
    </select>
    <button class="btn btn-primary" onclick="openModalReserva()"><i class="ti ti-plus"></i> Nova Reserva</button>
  </div>
  <div class="card">
    <div class="card-header"><span class="card-title"><i class="ti ti-calendar-event"></i> Reservas (${STATE.reservas.length})</span></div>
    <div class="table-wrapper"><table><thead><tr><th>Equipamento</th><th>Solicitante</th><th>Cargo</th><th>Sala</th><th>Data</th><th>Horário</th><th>Qtd</th><th>Unidade</th><th>Status</th><th>Ações</th></tr></thead>
    <tbody id="reservas-tbody">${renderReservasRows(STATE.reservas)}</tbody></table></div>
  </div>`;
}

function renderReservasRows(list) {
  if (!list.length) return `<tr><td colspan="10"><div class="empty-state"><i class="ti ti-calendar-off"></i><h3>Nenhuma reserva encontrada</h3></div></td></tr>`;
  return list.map(r=>`
  <tr>
    <td><strong>${r.equipamento}</strong><br><span class="text-muted">${r.equipamentoTipo}</span></td>
    <td>${r.solicitante}</td>
    <td><span class="text-muted">${r.cargo}</span></td>
    <td>${r.sala}</td>
    <td>${formatDate(r.dataInicio)}</td>
    <td>${r.horaInicio}–${r.horaFim}</td>
    <td><strong>${r.quantidade}</strong></td>
    <td>${r.unidade||'Matriz'}</td>
    <td><span class="badge badge-${r.status}">${r.status}</span></td>
    <td>
      <div class="actions-menu">
        <button class="btn-icon" onclick="toggleMenu(this)"><i class="ti ti-dots-vertical"></i></button>
        <div class="actions-dropdown" style="display:none">
          <button onclick="editReserva(${r.id})"><i class="ti ti-edit"></i> Editar</button>
          <button onclick="changeReservaStatus(${r.id},'ativo');renderPage(STATE.currentPage)"><i class="ti ti-refresh"></i> Reativar</button>
          <button onclick="changeReservaStatus(${r.id},'suspenso');renderPage(STATE.currentPage)"><i class="ti ti-player-pause"></i> Suspender</button>
          <button onclick="changeReservaStatus(${r.id},'fechado');renderPage(STATE.currentPage)"><i class="ti ti-circle-check"></i> Fechar</button>
          <hr>
          <button class="danger" onclick="deleteReserva(${r.id})"><i class="ti ti-trash"></i> Excluir</button>
        </div>
      </div>
    </td>
  </tr>`).join('');
}

// ===== CHAMADOS =====
function getFilteredChamados() {
  const q=($('#search-chamado')?.value||'').toLowerCase();
  const st=$('#filter-chamado-status')?.value||'';
  const prio=$('#filter-chamado-prio')?.value||'';
  return STATE.chamados.filter(c=>c.status!=='fechado'&&c.status!=='cancelado'&&(!q||c.titulo.toLowerCase().includes(q)||c.solicitante.toLowerCase().includes(q))&&(!st||c.status===st)&&(!prio||c.prioridade===prio));
}

function chamados() {
  const ativos=STATE.chamados.filter(c=>c.status!=='fechado'&&c.status!=='cancelado');
  return `
  <div class="filter-bar">
    <div class="search-bar"><i class="ti ti-search"></i><input type="text" placeholder="Buscar..." id="search-chamado"/></div>
    <select class="filter-select" id="filter-chamado-status"><option value="">Todos</option><option value="aberto">Aberto</option><option value="andamento">Em Andamento</option><option value="suspenso">Suspenso</option><option value="pendente">Pendente</option></select>
    <select class="filter-select" id="filter-chamado-prio"><option value="">Prioridade</option><option value="Alta">Alta</option><option value="Media">Média</option><option value="Baixa">Baixa</option></select>
    <button class="btn btn-primary" onclick="openModalChamado()"><i class="ti ti-plus"></i> Novo Chamado</button>
  </div>
  <div class="card">
    <div class="card-header"><span class="card-title"><i class="ti ti-headset"></i> Chamados Ativos (${ativos.length})</span></div>
    <div class="table-wrapper"><table><thead><tr><th>#</th><th>Título</th><th>Categoria</th><th>Prioridade</th><th>Solicitante</th><th>Atribuído</th><th>Unidade</th><th>Status</th><th>Criado</th><th>Ações</th></tr></thead>
    <tbody id="chamados-tbody">${renderChamadosRows(ativos)}</tbody></table></div>
  </div>`;
}

function prioColor(p){ return p==='Alta'?'#e74c3c':p==='Media'?'#e67e22':'#27ae60'; }

function renderChamadosRows(list) {
  if (!list.length) return `<tr><td colspan="10"><div class="empty-state"><i class="ti ti-mood-happy"></i><h3>Nenhum chamado ativo</h3></div></td></tr>`;
  return list.map(c=>`
  <tr>
    <td><strong style="color:var(--primary)">#${c.id}</strong></td>
    <td><strong>${c.titulo}</strong><br><span class="text-muted">${c.descricao.slice(0,35)}...</span></td>
    <td>${c.categoria}</td>
    <td><span style="color:${prioColor(c.prioridade)};font-weight:700">${c.prioridade}</span></td>
    <td>${c.solicitante}</td>
    <td>${c.atribuido||'<span class="text-muted">—</span>'}</td>
    <td>${c.unidade||'Matriz'}</td>
    <td><span class="badge badge-${c.status}">${c.status}</span></td>
    <td>${formatDate(c.criado)}</td>
    <td>
      <div class="actions-menu">
        <button class="btn-icon" onclick="toggleMenu(this)"><i class="ti ti-dots-vertical"></i></button>
        <div class="actions-dropdown" style="display:none">
          <button onclick="editChamado(${c.id})"><i class="ti ti-edit"></i> Editar</button>
          <button onclick="changeChamadoStatus(${c.id},'andamento');renderPage(STATE.currentPage)"><i class="ti ti-loader"></i> Em Andamento</button>
          <button onclick="changeChamadoStatus(${c.id},'pendente');renderPage(STATE.currentPage)"><i class="ti ti-clock"></i> Pendente</button>
          <button onclick="changeChamadoStatus(${c.id},'suspenso');renderPage(STATE.currentPage)"><i class="ti ti-player-pause"></i> Suspender</button>
          <button onclick="changeChamadoStatus(${c.id},'fechado');renderPage(STATE.currentPage)"><i class="ti ti-circle-check"></i> Fechar</button>
          <hr>
          <button class="danger" onclick="deleteChamado(${c.id})"><i class="ti ti-trash"></i> Excluir</button>
        </div>
      </div>
    </td>
  </tr>`).join('');
}

// ===== ARQUIVADOS =====
function arquivados() {
  return `
  <div class="tabs">
    <button class="tab active" data-arq="chamados">Chamados Encerrados</button>
    <button class="tab" data-arq="reservas">Reservas Encerradas</button>
  </div>
  <div id="arq-content">${renderArqChamados()}</div>`;
}
function renderArqChamados() {
  const list=STATE.chamados.filter(c=>c.status==='fechado'||c.status==='cancelado');
  return `<div class="card"><div class="card-header"><span class="card-title"><i class="ti ti-archive"></i> Chamados Arquivados (${list.length})</span></div>
  <div class="table-wrapper"><table><thead><tr><th>#</th><th>Título</th><th>Categoria</th><th>Solicitante</th><th>Unidade</th><th>Status</th><th>Atualizado</th><th>Ações</th></tr></thead>
  <tbody>${list.length===0?`<tr><td colspan="8"><div class="empty-state"><i class="ti ti-archive"></i><h3>Nenhum chamado arquivado</h3></div></td></tr>`:list.map(c=>`
  <tr><td><strong style="color:var(--primary)">#${c.id}</strong></td><td><strong>${c.titulo}</strong></td><td>${c.categoria}</td><td>${c.solicitante}</td><td>${c.unidade||'Matriz'}</td><td><span class="badge badge-${c.status}">${c.status}</span></td><td>${formatDate(c.atualizado)}</td>
  <td><div style="display:flex;gap:6px">
    <button class="btn btn-sm btn-ghost" onclick="changeChamadoStatus(${c.id},'aberto');renderPage('arquivados')"><i class="ti ti-refresh"></i> Reabrir</button>
    <button class="btn btn-sm btn-ghost" onclick="editChamado(${c.id})"><i class="ti ti-edit"></i></button>
    <button class="btn btn-sm btn-danger" onclick="deleteChamado(${c.id});renderPage('arquivados')"><i class="ti ti-trash"></i></button>
  </div></td></tr>`).join('')}</tbody></table></div></div>`;
}
function renderArqReservas() {
  const list=STATE.reservas.filter(r=>r.status==='fechado'||r.status==='cancelado');
  return `<div class="card"><div class="card-header"><span class="card-title"><i class="ti ti-calendar-off"></i> Reservas Arquivadas (${list.length})</span></div>
  <div class="table-wrapper"><table><thead><tr><th>Equipamento</th><th>Solicitante</th><th>Sala</th><th>Unidade</th><th>Data</th><th>Status</th><th>Ações</th></tr></thead>
  <tbody>${list.length===0?`<tr><td colspan="7"><div class="empty-state"><i class="ti ti-calendar-off"></i><h3>Nenhuma reserva arquivada</h3></div></td></tr>`:list.map(r=>`
  <tr><td><strong>${r.equipamento}</strong></td><td>${r.solicitante}</td><td>${r.sala}</td><td>${r.unidade||'Matriz'}</td><td>${formatDate(r.dataInicio)}</td><td><span class="badge badge-${r.status}">${r.status}</span></td>
  <td><div style="display:flex;gap:6px">
    <button class="btn btn-sm btn-ghost" onclick="changeReservaStatus(${r.id},'ativo');renderPage('arquivados')"><i class="ti ti-refresh"></i> Reativar</button>
    <button class="btn btn-sm btn-danger" onclick="deleteReserva(${r.id});renderPage('arquivados')"><i class="ti ti-trash"></i></button>
  </div></td></tr>`).join('')}</tbody></table></div></div>`;
}
document.addEventListener('click',e=>{ if(e.target.matches('[data-arq]')){ $$('[data-arq]').forEach(t=>t.classList.remove('active')); e.target.classList.add('active'); $('#arq-content').innerHTML=e.target.dataset.arq==='chamados'?renderArqChamados():renderArqReservas(); } });

// ===== INVENTÁRIO TI =====
const INV_CATS=['Rede','Impressora','Computador','Notebook','Monitor','Servidor','Câmera','Telefone IP','No-break','Access Point','Outro'];

function inventario() {
  return `
  <div class="filter-bar">
    <div class="search-bar"><i class="ti ti-search"></i><input type="text" placeholder="Buscar item..." id="search-inv"/></div>
    <select class="filter-select" id="filter-inv-cat"><option value="">Todas as categorias</option>${INV_CATS.map(c=>`<option>${c}</option>`).join('')}</select>
    <select class="filter-select" id="filter-inv-uni"><option value="">Todas as unidades</option><option>Matriz</option><option>Ensino Médio</option></select>
    <button class="btn btn-primary" onclick="openModalInventario()"><i class="ti ti-plus"></i> Novo Item</button>
  </div>
  <div class="stats-grid" style="grid-template-columns:repeat(auto-fit,minmax(160px,1fr));margin-bottom:20px">
    ${INV_CATS.filter(c=>STATE.inventario.some(i=>i.categoria===c)).map(c=>`
    <div class="stat-card" style="padding:14px 16px">
      <div class="stat-icon blue" style="width:36px;height:36px;font-size:16px"><i class="ti ti-${invIcon(c)}"></i></div>
      <div class="stat-info"><div class="stat-number" style="font-size:20px">${STATE.inventario.filter(i=>i.categoria===c).length}</div><div class="stat-label">${c}</div></div>
    </div>`).join('')}
  </div>
  <div class="card">
    <div class="card-header"><span class="card-title"><i class="ti ti-server"></i> Inventário Completo (${STATE.inventario.length} itens)</span></div>
    <div class="table-wrapper"><table><thead><tr><th>Nome</th><th>Categoria</th><th>Marca/Modelo</th><th>Patrimônio</th><th>Nº Série</th><th>IP</th><th>Local</th><th>Unidade</th><th>Garantia</th><th>Status</th><th>Ações</th></tr></thead>
    <tbody id="inv-tbody">${renderInvRows(STATE.inventario)}</tbody></table></div>
  </div>`;
}

function invIcon(c){ const m={Rede:'network',Impressora:'printer',Computador:'desktop',Notebook:'device-laptop',Monitor:'device-desktop',Servidor:'server',Câmera:'camera',NoBreak:'plug','Access Point':'wifi',Telefone:'phone'}; return m[c]||'device-floppy'; }

function renderInvRows(list) {
  if(!list.length) return `<tr><td colspan="11"><div class="empty-state"><i class="ti ti-server-off"></i><h3>Nenhum item no inventário</h3></div></td></tr>`;
  return list.map(i=>`
  <tr>
    <td><strong>${i.nome}</strong>${i.obs?`<br><span class="text-muted">${i.obs}</span>`:''}</td>
    <td><span class="badge badge-reservado">${i.categoria}</span></td>
    <td>${i.marca} ${i.modelo}</td>
    <td><code style="background:var(--gray-100);padding:2px 6px;border-radius:4px;font-size:11px">${i.patrimonio}</code></td>
    <td><span class="text-muted" style="font-size:11px">${i.serie||'—'}</span></td>
    <td><code style="font-size:11px">${i.ip||'—'}</code></td>
    <td>${i.local}</td>
    <td>${i.unidade}</td>
    <td><span style="color:${diasParaVencer(i.garantia)<90?'var(--warning)':'inherit'}">${formatDate(i.garantia)}</span></td>
    <td><span class="badge badge-${i.status==='ativo'?'fechado':'suspenso'}">${i.status}</span></td>
    <td>
      <div style="display:flex;gap:4px">
        <button class="btn-icon" onclick="editInventario(${i.id})" title="Editar"><i class="ti ti-edit"></i></button>
        <button class="btn-icon" onclick="deleteInventario(${i.id})" title="Excluir" style="color:var(--danger)"><i class="ti ti-trash"></i></button>
      </div>
    </td>
  </tr>`).join('');
}

function attachInvFilter() {
  const s=$('#search-inv'), fc=$('#filter-inv-cat'), fu=$('#filter-inv-uni');
  function applyFilter(){
    const q=(s?.value||'').toLowerCase(), c=fc?.value||'', u=fu?.value||'';
    const f=STATE.inventario.filter(i=>(!q||i.nome.toLowerCase().includes(q)||i.marca.toLowerCase().includes(q))&&(!c||i.categoria===c)&&(!u||i.unidade===u));
    const tb=$('#inv-tbody'); if(tb) tb.innerHTML=renderInvRows(f);
  }
  if(s) s.addEventListener('input',applyFilter);
  if(fc) fc.addEventListener('change',applyFilter);
  if(fu) fu.addEventListener('change',applyFilter);
}

// ===== LICENÇAS =====
function diasParaVencer(d) {
  if (!d || d==='9999-12-31') return 9999;
  return Math.ceil((new Date(d)-new Date())/86400000);
}

function licencas() {
  return `
  <div class="filter-bar">
    <div class="search-bar"><i class="ti ti-search"></i><input type="text" placeholder="Buscar licença..." id="search-lic"/></div>
    <select class="filter-select" id="filter-lic-status"><option value="">Todos</option><option value="ativo">Ativo</option><option value="vencendo">A Vencer</option><option value="expirado">Expirado</option></select>
    <button class="btn btn-primary" onclick="openModalLicenca()"><i class="ti ti-plus"></i> Nova Licença</button>
  </div>
  <div class="stats-grid" style="margin-bottom:20px">
    <div class="stat-card"><div class="stat-icon green"><i class="ti ti-license"></i></div><div class="stat-info"><div class="stat-number">${STATE.licencas.filter(l=>l.status==='ativo').length}</div><div class="stat-label">Licenças Ativas</div></div></div>
    <div class="stat-card" style="${STATE.licencas.filter(l=>diasParaVencer(l.vencimento)<=30).length>0?'border-color:var(--warning)':''}">
      <div class="stat-icon orange"><i class="ti ti-alert-triangle"></i></div>
      <div class="stat-info"><div class="stat-number">${STATE.licencas.filter(l=>diasParaVencer(l.vencimento)<=30&&diasParaVencer(l.vencimento)>0).length}</div><div class="stat-label">Vencem em 30 dias</div></div>
    </div>
    <div class="stat-card"><div class="stat-icon red"><i class="ti ti-ban"></i></div><div class="stat-info"><div class="stat-number">${STATE.licencas.filter(l=>l.status==='expirado').length}</div><div class="stat-label">Expiradas</div></div></div>
    <div class="stat-card"><div class="stat-icon blue"><i class="ti ti-coin"></i></div><div class="stat-info"><div class="stat-number">R$ ${STATE.licencas.reduce((a,l)=>a+l.valor,0).toLocaleString('pt-BR',{minimumFractionDigits:2})}</div><div class="stat-label">Investimento Total</div></div></div>
  </div>
  <div class="card">
    <div class="card-header"><span class="card-title"><i class="ti ti-license"></i> Licenças de Software (${STATE.licencas.length})</span></div>
    <div class="table-wrapper"><table><thead><tr><th>Software</th><th>Fornecedor</th><th>Tipo</th><th>Qtd</th><th>Unidade</th><th>Compra</th><th>Vencimento</th><th>Dias Restantes</th><th>Valor</th><th>Status</th><th>Ações</th></tr></thead>
    <tbody id="lic-tbody">${renderLicRows(STATE.licencas)}</tbody></table></div>
  </div>`;
}

function renderLicRows(list) {
  if(!list.length) return `<tr><td colspan="11"><div class="empty-state"><i class="ti ti-license-off"></i><h3>Nenhuma licença cadastrada</h3></div></td></tr>`;
  return list.map(l=>{
    const dias=diasParaVencer(l.vencimento);
    const alertColor=dias<=30?'var(--danger)':dias<=90?'var(--warning)':'var(--success)';
    const diasLabel=dias>=9999?'Perpétua':`${dias} dias`;
    return `<tr>
      <td><strong>${l.nome}</strong>${l.obs?`<br><span class="text-muted">${l.obs}</span>`:''}</td>
      <td>${l.fornecedor}</td>
      <td><span class="badge badge-reservado">${l.tipo}</span></td>
      <td><strong>${l.quantidade}</strong></td>
      <td>${l.unidade}</td>
      <td>${formatDate(l.dataCompra)}</td>
      <td><strong style="color:${alertColor}">${formatDate(l.vencimento)}</strong></td>
      <td><span style="color:${alertColor};font-weight:700">${diasLabel}</span></td>
      <td>R$ ${l.valor.toLocaleString('pt-BR',{minimumFractionDigits:2})}</td>
      <td><span class="badge badge-${l.status==='ativo'?'fechado':l.status==='vencendo'?'andamento':'suspenso'}">${l.status}</span></td>
      <td>
        <div style="display:flex;gap:4px">
          <button class="btn-icon" onclick="editLicenca(${l.id})" title="Editar"><i class="ti ti-edit"></i></button>
          <button class="btn-icon" onclick="deleteLicenca(${l.id})" title="Excluir" style="color:var(--danger)"><i class="ti ti-trash"></i></button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

// ===== UNIDADES =====
function matriz() { return renderUnidadePage('Matriz'); }
function ensinomedio() { return renderUnidadePage('Ensino Médio'); }

function renderUnidadePage(unidade) {
  const equips=STATE.equipamentos.filter(e=>e.unidade===unidade);
  const reservas=STATE.reservas.filter(r=>(r.unidade||'Matriz')===unidade&&r.status==='ativo');
  const chamados=STATE.chamados.filter(c=>(c.unidade||'Matriz')===unidade&&c.status!=='fechado');
  const icon=unidade==='Matriz'?'ti-building-school':'ti-building';
  return `
  <div class="stats-grid" style="margin-bottom:20px">
    <div class="stat-card"><div class="stat-icon blue"><i class="ti ti-devices"></i></div><div class="stat-info"><div class="stat-number">${equips.length}</div><div class="stat-label">Equipamentos</div></div></div>
    <div class="stat-card"><div class="stat-icon green"><i class="ti ti-calendar-event"></i></div><div class="stat-info"><div class="stat-number">${reservas.length}</div><div class="stat-label">Reservas Ativas</div></div></div>
    <div class="stat-card"><div class="stat-icon red"><i class="ti ti-headset"></i></div><div class="stat-info"><div class="stat-number">${chamados.length}</div><div class="stat-label">Chamados Abertos</div></div></div>
    <div class="stat-card"><div class="stat-icon teal"><i class="ti ti-server"></i></div><div class="stat-info"><div class="stat-number">${STATE.inventario.filter(i=>i.unidade===unidade).length}</div><div class="stat-label">Itens Inventário</div></div></div>
  </div>
  <div class="filter-bar">
    <div class="search-bar"><i class="ti ti-search"></i><input type="text" placeholder="Buscar equipamento..." id="search-unid"/></div>
    <select class="filter-select" id="filter-unid-tipo"><option value="">Todos os tipos</option><option>Notebook</option><option>iPad</option><option>Projetor</option><option>Caixa de Som</option><option>Monitor</option><option>Impressora</option><option>Outro</option></select>
    <button class="btn btn-primary" onclick="openModalEquipamento('${unidade}')"><i class="ti ti-plus"></i> Novo Equipamento</button>
  </div>
  <div class="card">
    <div class="card-header"><span class="card-title"><i class="${icon}"></i> ${unidade} — Equipamentos (${equips.length})</span></div>
    <div class="table-wrapper"><table><thead><tr><th>Nome</th><th>Tipo</th><th>Patrimônio</th><th>Local</th><th>Descrição</th><th>Status</th><th>Ações</th></tr></thead>
    <tbody id="unid-tbody">${renderUnidadeEquips(equips)}</tbody></table></div>
  </div>`;
}

function renderUnidadeEquips(list) {
  if(!list.length) return `<tr><td colspan="7"><div class="empty-state"><i class="ti ti-devices-off"></i><h3>Nenhum equipamento cadastrado</h3></div></td></tr>`;
  return list.map(e=>`<tr>
    <td><strong>${e.nome}</strong></td><td>${e.tipo}</td>
    <td><code style="background:var(--gray-100);padding:2px 6px;border-radius:4px;font-size:12px">${e.patrimonio}</code></td>
    <td>${e.local||'—'}</td><td><span class="text-muted">${e.descricao}</span></td>
    <td>${equipStatus(e.status)}</td>
    <td><div style="display:flex;gap:4px">
      <button class="btn-icon" onclick="editEquipamento(${e.id})" title="Editar"><i class="ti ti-edit"></i></button>
      <button class="btn-icon" onclick="deleteEquipamento(${e.id})" title="Excluir" style="color:var(--danger)"><i class="ti ti-trash"></i></button>
    </div></td>
  </tr>`).join('');
}

function attachUnidadeFilter(unidade) {
  const s=$('#search-unid'), ft=$('#filter-unid-tipo');
  function applyFilter(){
    const q=(s?.value||'').toLowerCase(), t=ft?.value||'';
    const f=STATE.equipamentos.filter(e=>e.unidade===unidade&&(!q||e.nome.toLowerCase().includes(q))&&(!t||e.tipo===t));
    const tb=$('#unid-tbody'); if(tb) tb.innerHTML=renderUnidadeEquips(f);
  }
  if(s) s.addEventListener('input',applyFilter);
  if(ft) ft.addEventListener('change',applyFilter);
}

// ===== EQUIPAMENTOS (admin geral) =====
function equipamentos() {
  return `
  <div class="filter-bar">
    <div class="search-bar"><i class="ti ti-search"></i><input type="text" placeholder="Buscar..." id="search-equip"/></div>
    <select class="filter-select" id="filter-equip-tipo"><option value="">Todos os tipos</option><option>Notebook</option><option>iPad</option><option>Projetor</option><option>Caixa de Som</option><option>Monitor</option><option>Impressora</option><option>Outro</option></select>
    <select class="filter-select" id="filter-equip-uni"><option value="">Todas as unidades</option><option>Matriz</option><option>Ensino Médio</option></select>
    <button class="btn btn-primary" onclick="openModalEquipamento()"><i class="ti ti-plus"></i> Novo</button>
  </div>
  <div class="card">
    <div class="card-header"><span class="card-title"><i class="ti ti-devices"></i> Todos os Equipamentos (${STATE.equipamentos.length})</span></div>
    <div class="table-wrapper"><table><thead><tr><th>Nome</th><th>Tipo</th><th>Patrimônio</th><th>Marca/Modelo</th><th>Local</th><th>Unidade</th><th>Status</th><th>Ações</th></tr></thead>
    <tbody id="equip-tbody">${renderEquipRows(STATE.equipamentos)}</tbody></table></div>
  </div>`;
}

function equipStatus(s){ const m={disponivel:'badge-fechado',reservado:'badge-reservado',manutencao:'badge-andamento',inativo:'badge-suspenso'}; const l={disponivel:'Disponível',reservado:'Reservado',manutencao:'Manutenção',inativo:'Inativo'}; return `<span class="badge ${m[s]||'badge-cancelado'}">${l[s]||s}</span>`; }

function renderEquipRows(list) {
  if(!list.length) return `<tr><td colspan="8"><div class="empty-state"><i class="ti ti-devices-off"></i><h3>Nenhum equipamento</h3></div></td></tr>`;
  return list.map(e=>`<tr>
    <td><strong>${e.nome}</strong></td><td>${e.tipo}</td>
    <td><code style="background:var(--gray-100);padding:2px 6px;border-radius:4px;font-size:12px">${e.patrimonio}</code></td>
    <td>${e.marca||'—'} ${e.modelo||''}</td><td>${e.local||'—'}</td><td>${e.unidade}</td>
    <td>${equipStatus(e.status)}</td>
    <td><div style="display:flex;gap:4px">
      <button class="btn-icon" onclick="editEquipamento(${e.id})" title="Editar"><i class="ti ti-edit"></i></button>
      <button class="btn-icon" onclick="deleteEquipamento(${e.id})" title="Excluir" style="color:var(--danger)"><i class="ti ti-trash"></i></button>
    </div></td>
  </tr>`).join('');
}

function attachEquipFilter() {
  const s=$('#search-equip'), ft=$('#filter-equip-tipo'), fu=$('#filter-equip-uni');
  function applyFilter(){
    const q=(s?.value||'').toLowerCase(), t=ft?.value||'', u=fu?.value||'';
    const f=STATE.equipamentos.filter(e=>(!q||e.nome.toLowerCase().includes(q))&&(!t||e.tipo===t)&&(!u||e.unidade===u));
    const tb=$('#equip-tbody'); if(tb) tb.innerHTML=renderEquipRows(f);
  }
  if(s) s.addEventListener('input',applyFilter);
  if(ft) ft.addEventListener('change',applyFilter);
  if(fu) fu.addEventListener('change',applyFilter);
}

// ===== USUÁRIOS =====
function usuarios() {
  return `
  <div class="filter-bar">
    <div class="search-bar"><i class="ti ti-search"></i><input type="text" placeholder="Buscar usuário..." id="search-user"/></div>
    <select class="filter-select" id="filter-user-status"><option value="">Todos</option><option value="ativo">Ativo</option><option value="suspenso">Suspenso</option></select>
    <button class="btn btn-primary" onclick="openModalUsuario()"><i class="ti ti-user-plus"></i> Novo Usuário</button>
  </div>
  <div class="card">
    <div class="card-header"><span class="card-title"><i class="ti ti-users"></i> Usuários (${STATE.users.length})</span></div>
    <div class="table-wrapper"><table><thead><tr><th>Usuário</th><th>E-mail</th><th>Login</th><th>Unidade</th><th>Perfil</th><th>Status</th><th>Cadastro</th><th>Ações</th></tr></thead>
    <tbody id="users-tbody">${renderUserRows(STATE.users)}</tbody></table></div>
  </div>`;
}

function renderUserRows(list) {
  const q=($('#search-user')?.value||'').toLowerCase();
  const st=$('#filter-user-status')?.value||'';
  const filtered=list.filter(u=>(!q||u.nome.toLowerCase().includes(q)||u.email.toLowerCase().includes(q)||u.usuario.toLowerCase().includes(q))&&(!st||u.status===st));
  if(!filtered.length) return `<tr><td colspan="8"><div class="empty-state"><i class="ti ti-users-off"></i><h3>Nenhum usuário encontrado</h3></div></td></tr>`;
  return filtered.map(u=>`<tr>
    <td><div style="display:flex;align-items:center;gap:10px"><div class="user-avatar-lg" style="background:${u.role==='admin'?'var(--primary)':'#7b1fa2'}">${initials(u.nome)}</div><div><div style="font-weight:700">${u.nome}</div></div></div></td>
    <td>${u.email}</td>
    <td><code style="background:var(--gray-100);padding:2px 6px;border-radius:4px;font-size:12px">${u.usuario}</code></td>
    <td>${u.unidade||'—'}</td>
    <td><span class="badge" style="background:${u.role==='admin'?'#dbeafe':'#ede9fe'};color:${u.role==='admin'?'#1d4ed8':'#5b21b6'}">${u.role==='admin'?'Admin':'Usuário'}</span></td>
    <td><span class="badge ${u.status==='ativo'?'badge-fechado':'badge-suspenso'}">${u.status}</span></td>
    <td>${formatDate(u.criado)}</td>
    <td><div style="display:flex;gap:4px">
      <button class="btn-icon" onclick="editUsuario(${u.id})" title="Editar"><i class="ti ti-edit"></i></button>
      <button class="btn-icon" onclick="toggleUserStatus(${u.id})" title="${u.status==='ativo'?'Suspender':'Ativar'}" style="color:${u.status==='ativo'?'var(--warning)':'var(--success)'}"><i class="ti ti-${u.status==='ativo'?'ban':'refresh'}"></i></button>
      <button class="btn-icon" onclick="deleteUsuario(${u.id})" title="Excluir" style="color:var(--danger)"><i class="ti ti-trash"></i></button>
    </div></td>
  </tr>`).join('');
}

// ===== PÁGINAS DE USUÁRIO NORMAL =====
function novaReserva() { setTimeout(()=>openModalReserva(),100); return `<div class="empty-state" style="padding:80px"><i class="ti ti-calendar-plus" style="font-size:56px;color:var(--primary)"></i><h3>Abrindo formulário de reserva...</h3></div>`; }
function novoChamado() { setTimeout(()=>openModalChamado(),100); return `<div class="empty-state" style="padding:80px"><i class="ti ti-headset" style="font-size:56px;color:var(--primary)"></i><h3>Abrindo formulário de chamado...</h3></div>`; }
function meuschamados() {
  const u=STATE.currentUser;
  const meus=STATE.chamados.filter(c=>c.solicitante===u.nome);
  return `<div class="card">
    <div class="card-header"><span class="card-title"><i class="ti ti-list-check"></i> Meus Chamados (${meus.length})</span>
    <button class="btn btn-primary btn-sm" onclick="openModalChamado()"><i class="ti ti-plus"></i> Novo</button></div>
    <div class="table-wrapper"><table><thead><tr><th>#</th><th>Título</th><th>Categoria</th><th>Prioridade</th><th>Status</th><th>Criado</th><th>Atualizado</th></tr></thead>
    <tbody>${meus.length===0?`<tr><td colspan="7"><div class="empty-state"><i class="ti ti-mood-happy"></i><h3>Você não tem chamados</h3></div></td></tr>`:meus.map(c=>`
    <tr><td><strong style="color:var(--primary)">#${c.id}</strong></td><td><strong>${c.titulo}</strong><br><span class="text-muted">${c.descricao.slice(0,40)}...</span></td><td>${c.categoria}</td><td><span style="color:${prioColor(c.prioridade)};font-weight:700">${c.prioridade}</span></td><td><span class="badge badge-${c.status}">${c.status}</span></td><td>${formatDate(c.criado)}</td><td>${formatDate(c.atualizado)}</td></tr>`).join('')}</tbody></table></div>
  </div>`;
}

// ===== RELATÓRIOS =====
function relatorios() {
  return `
  <div class="report-filters">
    <label style="font-weight:600;font-size:13px">Período:</label>
    <select class="filter-select" id="rel-periodo"><option value="mes">Este mês</option><option value="trimestre">Trimestre</option><option value="semestre">Semestre</option><option value="anual">Anual</option></select>
    <select class="filter-select" id="rel-uni"><option value="">Todas as unidades</option><option value="Matriz">Matriz</option><option value="Ensino Médio">Ensino Médio</option></select>
    <button class="btn btn-primary" onclick="gerarRelatorio()"><i class="ti ti-chart-bar"></i> Gerar</button>
    <button class="btn btn-ghost" onclick="window.print()"><i class="ti ti-printer"></i> Imprimir</button>
    <button class="btn btn-ghost" onclick="toast('Para PDF: use Imprimir → Salvar como PDF','info')"><i class="ti ti-file-type-pdf"></i> PDF</button>
  </div>
  <div class="grid-2 mb-20">
    <div class="card"><div class="card-header"><span class="card-title"><i class="ti ti-chart-line"></i> Chamados por Mês</span></div><div class="card-body"><div class="chart-container"><canvas id="chart-mensal"></canvas></div></div></div>
    <div class="card"><div class="card-header"><span class="card-title"><i class="ti ti-chart-pie"></i> Chamados por Prioridade</span></div><div class="card-body"><div class="chart-container"><canvas id="chart-prio"></canvas></div></div></div>
  </div>
  <div class="grid-2 mb-20">
    <div class="card"><div class="card-header"><span class="card-title"><i class="ti ti-chart-bar"></i> Uso por Equipamento</span></div><div class="card-body"><div class="chart-container"><canvas id="chart-equip-uso"></canvas></div></div></div>
    <div class="card"><div class="card-header"><span class="card-title"><i class="ti ti-user-check"></i> Chamados por Usuário</span></div><div class="card-body"><div class="chart-container"><canvas id="chart-user"></canvas></div></div></div>
  </div>
  <div class="grid-2 mb-20">
    <div class="card"><div class="card-header"><span class="card-title"><i class="ti ti-building-school"></i> Chamados por Unidade</span></div><div class="card-body"><div class="chart-container"><canvas id="chart-unidade"></canvas></div></div></div>
    <div class="card"><div class="card-header"><span class="card-title"><i class="ti ti-license"></i> Licenças — Vencimento</span></div><div class="card-body"><div class="chart-container"><canvas id="chart-lic"></canvas></div></div></div>
  </div>
  <div class="card">
    <div class="card-header"><span class="card-title"><i class="ti ti-table"></i> Detalhamento — Chamados</span></div>
    <div class="table-wrapper"><table><thead><tr><th>#</th><th>Título</th><th>Categoria</th><th>Prioridade</th><th>Solicitante</th><th>Unidade</th><th>Status</th><th>Criado</th></tr></thead>
    <tbody>${STATE.chamados.map(c=>`<tr><td><strong>#${c.id}</strong></td><td>${c.titulo}</td><td>${c.categoria}</td><td><span style="color:${prioColor(c.prioridade)};font-weight:700">${c.prioridade}</span></td><td>${c.solicitante}</td><td>${c.unidade||'Matriz'}</td><td><span class="badge badge-${c.status}">${c.status}</span></td><td>${formatDate(c.criado)}</td></tr>`).join('')}</tbody></table></div>
  </div>`;
}

function renderRelatorioCharts() {
  const meses=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  const ctx1=document.getElementById('chart-mensal');
  if(ctx1) new Chart(ctx1,{type:'line',data:{labels:meses,datasets:[{label:'Chamados',data:meses.map((_,i)=>Math.floor(Math.random()*8)+1),borderColor:'#0073c8',backgroundColor:'rgba(0,115,200,.08)',tension:.4,fill:true,pointRadius:4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}});
  const ctx2=document.getElementById('chart-prio');
  if(ctx2) new Chart(ctx2,{type:'pie',data:{labels:['Alta','Média','Baixa'],datasets:[{data:[STATE.chamados.filter(c=>c.prioridade==='Alta').length,STATE.chamados.filter(c=>c.prioridade==='Media').length,STATE.chamados.filter(c=>c.prioridade==='Baixa').length],backgroundColor:['#e74c3c','#e67e22','#27ae60'],borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}}}});
  const eu={};STATE.reservas.forEach(r=>{eu[r.equipamentoTipo]=(eu[r.equipamentoTipo]||0)+1;});
  const ctx3=document.getElementById('chart-equip-uso');
  if(ctx3) new Chart(ctx3,{type:'bar',data:{labels:Object.keys(eu),datasets:[{label:'Reservas',data:Object.values(eu),backgroundColor:'#0073c8',borderRadius:6}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{stepSize:1}}}}});
  const uu={};STATE.chamados.forEach(c=>{const n=c.solicitante.split(' ')[0];uu[n]=(uu[n]||0)+1;});
  const ctx4=document.getElementById('chart-user');
  if(ctx4) new Chart(ctx4,{type:'bar',data:{labels:Object.keys(uu),datasets:[{label:'Chamados',data:Object.values(uu),backgroundColor:['#0073c8','#27ae60','#e67e22'],borderRadius:6}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{stepSize:1}}}}});
  const unid={Matriz:STATE.chamados.filter(c=>(c.unidade||'Matriz')==='Matriz').length,'Ensino Médio':STATE.chamados.filter(c=>c.unidade==='Ensino Médio').length};
  const ctx5=document.getElementById('chart-unidade');
  if(ctx5) new Chart(ctx5,{type:'doughnut',data:{labels:Object.keys(unid),datasets:[{data:Object.values(unid),backgroundColor:['#0073c8','#7b1fa2'],borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}}}});
  const ctx6=document.getElementById('chart-lic');
  if(ctx6) new Chart(ctx6,{type:'bar',data:{labels:STATE.licencas.map(l=>l.nome.split(' ').slice(0,2).join(' ')),datasets:[{label:'Dias restantes',data:STATE.licencas.map(l=>Math.min(diasParaVencer(l.vencimento),730)),backgroundColor:STATE.licencas.map(l=>diasParaVencer(l.vencimento)<=30?'#e74c3c':diasParaVencer(l.vencimento)<=90?'#e67e22':'#27ae60'),borderRadius:6}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}});
}
function gerarRelatorio(){ toast('Relatório atualizado!','success'); setTimeout(renderRelatorioCharts,100); }

// ===== MODALS: RESERVA =====
function openModalReserva(reservaId=null, preData=null) {
  const r=reservaId?STATE.reservas.find(r=>r.id===reservaId):null;
  const TIPOS=[...new Set(STATE.equipamentos.map(e=>e.tipo)),'Outro'];
  openModal(`
  <div class="modal modal-lg">
    <div class="modal-header">
      <span class="modal-title"><i class="ti ti-calendar-plus"></i> ${r?'Editar Reserva':'Nova Reserva'}</span>
      <button class="btn-icon" onclick="closeModal()"><i class="ti ti-x"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-row">
        <div class="form-group">
          <label class="required">Tipo de Equipamento</label>
          <select id="res-tipo" onchange="updateEquipList()">
            <option value="">Selecione...</option>${TIPOS.map(t=>`<option ${r?.equipamentoTipo===t?'selected':''}>${t}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="required">Equipamento</label>
          <select id="res-equip" onchange="checkOutroEquip()"><option value="">Selecione o tipo primeiro...</option></select>
        </div>
      </div>
      <div class="form-group" id="res-outro-equip-group" style="display:none">
        <label class="required">Especifique o equipamento</label>
        <input type="text" id="res-outro-equip" placeholder="Descreva o equipamento..." />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="required">Unidade</label>
          <select id="res-unidade"><option value="Matriz" ${!r||r.unidade==='Matriz'?'selected':''}>Matriz</option><option value="Ensino Médio" ${r?.unidade==='Ensino Médio'?'selected':''}>Ensino Médio</option></select>
        </div>
        <div class="form-group">
          <label class="required">Cargo</label>
          <select id="res-cargo"><option value="">Selecione...</option>${CARGOS.map(c=>`<option ${r?.cargo===c?'selected':''}>${c}</option>`).join('')}</select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="required">Nome do Solicitante</label>
          <input type="text" id="res-nome" placeholder="Nome completo" value="${r?.solicitante||STATE.currentUser.nome}" />
        </div>
        <div class="form-group">
          <label class="required">Sala / Turma</label>
          <select id="res-sala" onchange="toggleOutroSala(this)">
            <option value="">Selecione...</option>${SALAS.map(s=>`<option ${r?.sala===s?'selected':''}>${s}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="form-group" id="res-outro-sala-group" style="display:none">
        <label class="required">Especifique a sala</label>
        <input type="text" id="res-outro-sala" placeholder="Nome da sala..." />
      </div>
      <div class="form-row-3">
        <div class="form-group">
          <label class="required">Data da Reserva</label>
          <input type="date" id="res-data" value="${r?.dataInicio||preData||dateNow()}" min="${dateNow()}" />
        </div>
        <div class="form-group">
          <label class="required">Horário Início</label>
          <select id="res-hinicio">${HORAS.map(h=>`<option ${r?.horaInicio===h?'selected':''}>${h}</option>`).join('')}</select>
        </div>
        <div class="form-group">
          <label class="required">Horário Fim</label>
          <select id="res-hfim">${HORAS.map(h=>`<option ${r?.horaFim===h?'selected':''}>${h}</option>`).join('')}</select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="required">Quantidade</label>
          <div class="qty-control">
            <button class="qty-btn" type="button" onclick="changeQty(-1)">−</button>
            <input class="qty-value" type="number" id="res-qtd" value="${r?.quantidade||1}" min="1" max="99"/>
            <button class="qty-btn" type="button" onclick="changeQty(1)">+</button>
          </div>
        </div>
        <div class="form-group">
          <label>Observações</label>
          <input type="text" id="res-obs" placeholder="Informações adicionais..." value="${r?.obs||''}" />
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-primary" onclick="salvarReserva(${reservaId||'null'})"><i class="ti ti-check"></i> ${r?'Salvar':'Confirmar Reserva'}</button>
    </div>
  </div>`);
  if(r) setTimeout(()=>updateEquipList(r.equipamento),60);
}

function updateEquipList(selectedEquip='') {
  const tipo=$('#res-tipo')?.value, sel=$('#res-equip'), og=$('#res-outro-equip-group');
  if(!sel) return;
  if(tipo==='Outro'){ sel.innerHTML='<option value="outro">Outro (especificar abaixo)</option>'; if(og) og.style.display=''; return; }
  if(og) og.style.display='none';
  const list=STATE.equipamentos.filter(e=>e.tipo===tipo&&(e.status==='disponivel'||e.status==='reservado'));
  sel.innerHTML=`<option value="">Selecione...</option>${list.map(e=>`<option value="${e.id}" ${e.nome===selectedEquip?'selected':''}>${e.nome} (${e.status})</option>`).join('')}<option value="outro">Outro (especificar)</option>`;
}
function checkOutroEquip(){ const sel=$('#res-equip'), og=$('#res-outro-equip-group'); if(og) og.style.display=sel?.value==='outro'?'':'none'; }
function toggleOutroSala(sel){ const g=$('#res-outro-sala-group'); if(g) g.style.display=sel.value==='Outro'?'':'none'; }
function changeQty(d){ const i=$('#res-qtd'); if(i) i.value=Math.max(1,Math.min(99,parseInt(i.value)+d)); }
function editReserva(id){ openModalReserva(id); }

function salvarReserva(id) {
  const tipo=$('#res-tipo')?.value;
  const equipVal=$('#res-equip')?.value;
  const equipNome=equipVal==='outro'?($('#res-outro-equip')?.value||'').trim():(STATE.equipamentos.find(e=>e.id==equipVal)?.nome||equipVal);
  const cargo=$('#res-cargo')?.value, nome=$('#res-nome')?.value.trim();
  const salaVal=$('#res-sala')?.value, sala=salaVal==='Outro'?($('#res-outro-sala')?.value||'').trim():salaVal;
  const data=$('#res-data')?.value, hinicio=$('#res-hinicio')?.value, hfim=$('#res-hfim')?.value;
  const qtd=parseInt($('#res-qtd')?.value)||1, obs=$('#res-obs')?.value||'', unidade=$('#res-unidade')?.value||'Matriz';
  if(!tipo||!equipNome||!cargo||!nome||!sala||!data||!hinicio||!hfim){ toast('Preencha todos os campos obrigatórios.','error'); return; }
  if(id){ const r=STATE.reservas.find(r=>r.id===id); if(r) Object.assign(r,{equipamentoTipo:tipo,equipamento:equipNome,cargo,solicitante:nome,sala,dataInicio:data,horaInicio:hinicio,horaFim:hfim,quantidade:qtd,obs,unidade}); toast('Reserva atualizada!'); }
  else { STATE.reservas.push({id:STATE.nextId.reserva++,equipamentoTipo:tipo,equipamento:equipNome,cargo,solicitante:nome,sala,dataInicio:data,horaInicio:hinicio,horaFim:hfim,quantidade:qtd,obs,unidade,status:'ativo',criado:dateNow()}); addNotification('Nova reserva criada',`${nome} reservou ${equipNome}`,'ti-calendar-plus'); toast('Reserva criada!'); }
  closeModal(); saveState(); renderPage(STATE.currentPage);
}

// ===== MODALS: CHAMADO =====
function openModalChamado(chamadoId=null) {
  const c=chamadoId?STATE.chamados.find(c=>c.id===chamadoId):null;
  openModal(`
  <div class="modal modal-lg">
    <div class="modal-header">
      <span class="modal-title"><i class="ti ti-headset"></i> ${c?'Editar Chamado':'Novo Chamado'}</span>
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
          <select id="ch-cat"><option value="">Selecione...</option>${['Hardware','Software','Rede','Impressora','Acesso/Senha','E-mail','Telefone IP','Câmera','Outro'].map(o=>`<option ${c?.categoria===o?'selected':''}>${o}</option>`).join('')}</select>
        </div>
        <div class="form-group">
          <label class="required">Prioridade</label>
          <select id="ch-prio">${['Baixa','Media','Alta'].map(p=>`<option ${c?.prioridade===p?'selected':''}>${p}</option>`).join('')}</select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="required">Solicitante</label>
          <input type="text" id="ch-sol" value="${c?.solicitante||STATE.currentUser.nome}" />
        </div>
        <div class="form-group">
          <label>Unidade</label>
          <select id="ch-unidade"><option value="Matriz" ${!c||c.unidade==='Matriz'?'selected':''}>Matriz</option><option value="Ensino Médio" ${c?.unidade==='Ensino Médio'?'selected':''}>Ensino Médio</option></select>
        </div>
      </div>
      ${STATE.currentUser.role==='admin'?`<div class="form-group"><label>Atribuir a (TI)</label><select id="ch-atrib"><option value="">Não atribuído</option>${STATE.users.filter(u=>u.role==='admin').map(u=>`<option value="${u.nome}" ${c?.atribuido===u.nome?'selected':''}>${u.nome}</option>`).join('')}</select></div>`:'<input type="hidden" id="ch-atrib" value="">'}
      <div class="form-group">
        <label class="required">Descrição Detalhada</label>
        <textarea id="ch-desc" placeholder="Descreva o problema com o máximo de detalhes possível...">${c?.descricao||''}</textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-primary" onclick="salvarChamado(${chamadoId||'null'})"><i class="ti ti-check"></i> ${c?'Salvar':'Abrir Chamado'}</button>
    </div>
  </div>`);
}
function editChamado(id){ openModalChamado(id); }

function salvarChamado(id) {
  const titulo=$('#ch-titulo')?.value.trim(), cat=$('#ch-cat')?.value, prio=$('#ch-prio')?.value;
  const sol=$('#ch-sol')?.value.trim(), atrib=$('#ch-atrib')?.value, desc=$('#ch-desc')?.value.trim(), unidade=$('#ch-unidade')?.value||'Matriz';
  if(!titulo||!cat||!prio||!sol||!desc){ toast('Preencha todos os campos obrigatórios.','error'); return; }
  if(id){ const c=STATE.chamados.find(c=>c.id===id); if(c) Object.assign(c,{titulo,categoria:cat,prioridade:prio,solicitante:sol,atribuido:atrib,descricao:desc,unidade,atualizado:dateNow()}); toast('Chamado atualizado!'); }
  else { STATE.chamados.push({id:STATE.nextId.chamado++,titulo,categoria:cat,prioridade:prio,solicitante:sol,atribuido:atrib,descricao:desc,unidade,status:'aberto',criado:dateNow(),atualizado:dateNow()}); addNotification('Novo chamado aberto',titulo,'ti-headset'); toast('Chamado aberto!'); }
  closeModal(); saveState(); renderPage(STATE.currentPage);
}

// ===== MODALS: INVENTÁRIO =====
function openModalInventario(invId=null) {
  const i=invId?STATE.inventario.find(i=>i.id===invId):null;
  openModal(`
  <div class="modal modal-lg">
    <div class="modal-header"><span class="modal-title"><i class="ti ti-server"></i> ${i?'Editar Item':'Novo Item no Inventário'}</span><button class="btn-icon" onclick="closeModal()"><i class="ti ti-x"></i></button></div>
    <div class="modal-body">
      <div class="form-group"><label class="required">Nome do Equipamento</label><input type="text" id="inv-nome" placeholder="Ex: Switch HP 24 portas" value="${i?.nome||''}"/></div>
      <div class="form-row">
        <div class="form-group"><label class="required">Categoria</label><select id="inv-cat"><option value="">Selecione...</option>${INV_CATS.map(c=>`<option ${i?.categoria===c?'selected':''}>${c}</option>`).join('')}</select></div>
        <div class="form-group"><label>Tipo/Subtipo</label><input type="text" id="inv-tipo" placeholder="Ex: Switch L2, Laser mono..." value="${i?.tipo||''}"/></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Marca</label><input type="text" id="inv-marca" value="${i?.marca||''}"/></div>
        <div class="form-group"><label>Modelo</label><input type="text" id="inv-modelo" value="${i?.modelo||''}"/></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="required">Nº Patrimônio</label><input type="text" id="inv-pat" placeholder="Ex: NET-001" value="${i?.patrimonio||''}"/></div>
        <div class="form-group"><label>Nº de Série</label><input type="text" id="inv-serie" value="${i?.serie||''}"/></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Endereço IP</label><input type="text" id="inv-ip" placeholder="192.168.1.1" value="${i?.ip||''}"/></div>
        <div class="form-group"><label>Local/Sala</label><input type="text" id="inv-local" value="${i?.local||''}"/></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="required">Unidade</label><select id="inv-unidade"><option value="Matriz" ${!i||i.unidade==='Matriz'?'selected':''}>Matriz</option><option value="Ensino Médio" ${i?.unidade==='Ensino Médio'?'selected':''}>Ensino Médio</option></select></div>
        <div class="form-group"><label>Garantia até</label><input type="date" id="inv-garantia" value="${i?.garantia||''}"/></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Status</label><select id="inv-status"><option value="ativo" ${!i||i.status==='ativo'?'selected':''}>Ativo</option><option value="inativo" ${i?.status==='inativo'?'selected':''}>Inativo</option><option value="manutencao" ${i?.status==='manutencao'?'selected':''}>Manutenção</option></select></div>
        <div class="form-group"><label>Observações</label><input type="text" id="inv-obs" value="${i?.obs||''}"/></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-primary" onclick="salvarInventario(${invId||'null'})"><i class="ti ti-check"></i> Salvar</button>
    </div>
  </div>`);
}
function editInventario(id){ openModalInventario(id); }
function salvarInventario(id) {
  const nome=$('#inv-nome')?.value.trim(), cat=$('#inv-cat')?.value, pat=$('#inv-pat')?.value.trim();
  if(!nome||!cat||!pat){ toast('Preencha nome, categoria e patrimônio.','error'); return; }
  const data={ nome, categoria:cat, tipo:$('#inv-tipo')?.value, marca:$('#inv-marca')?.value, modelo:$('#inv-modelo')?.value, patrimonio:pat, serie:$('#inv-serie')?.value, ip:$('#inv-ip')?.value, local:$('#inv-local')?.value, unidade:$('#inv-unidade')?.value||'Matriz', garantia:$('#inv-garantia')?.value, status:$('#inv-status')?.value||'ativo', obs:$('#inv-obs')?.value };
  if(id){ const i=STATE.inventario.find(i=>i.id===id); if(i) Object.assign(i,data); toast('Item atualizado!'); }
  else { STATE.inventario.push({id:STATE.nextId.inventario++,...data}); toast('Item adicionado ao inventário!'); }
  closeModal(); saveState(); renderPage('inventario');
}
function deleteInventario(id){ if(!confirm('Excluir este item?')) return; STATE.inventario=STATE.inventario.filter(i=>i.id!==id); saveState(); renderPage('inventario'); toast('Item excluído.','info'); }

// ===== MODALS: LICENÇA =====
function openModalLicenca(licId=null) {
  const l=licId?STATE.licencas.find(l=>l.id===licId):null;
  openModal(`
  <div class="modal modal-lg">
    <div class="modal-header"><span class="modal-title"><i class="ti ti-license"></i> ${l?'Editar Licença':'Nova Licença'}</span><button class="btn-icon" onclick="closeModal()"><i class="ti ti-x"></i></button></div>
    <div class="modal-body">
      <div class="form-group"><label class="required">Nome do Software</label><input type="text" id="lic-nome" placeholder="Ex: Microsoft 365 Education" value="${l?.nome||''}"/></div>
      <div class="form-row">
        <div class="form-group"><label class="required">Fornecedor</label><input type="text" id="lic-forn" value="${l?.fornecedor||''}"/></div>
        <div class="form-group"><label>Tipo</label><select id="lic-tipo">${['SaaS','Desktop','OEM','Subscrição','Perpétua','Outro'].map(t=>`<option ${l?.tipo===t?'selected':''}>${t}</option>`).join('')}</select></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Quantidade de Licenças</label><input type="number" id="lic-qtd" min="1" value="${l?.quantidade||1}"/></div>
        <div class="form-group"><label>Valor (R$)</label><input type="number" id="lic-valor" min="0" step="0.01" value="${l?.valor||0}"/></div>
      </div>
      <div class="form-group"><label>Chave / Código de Licença</label><input type="text" id="lic-chave" placeholder="XXXXX-XXXXX-XXXXX" value="${l?.chave||''}"/></div>
      <div class="form-row">
        <div class="form-group"><label>Data de Compra</label><input type="date" id="lic-compra" value="${l?.dataCompra||dateNow()}"/></div>
        <div class="form-group"><label class="required">Data de Vencimento</label><input type="date" id="lic-venc" value="${l?.vencimento||''}"/></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Unidade</label><select id="lic-unidade"><option value="Matriz" ${!l||l.unidade==='Matriz'?'selected':''}>Matriz</option><option value="Ensino Médio" ${l?.unidade==='Ensino Médio'?'selected':''}>Ensino Médio</option></select></div>
        <div class="form-group"><label>Status</label><select id="lic-status"><option value="ativo" ${!l||l.status==='ativo'?'selected':''}>Ativo</option><option value="vencendo" ${l?.status==='vencendo'?'selected':''}>A Vencer</option><option value="expirado" ${l?.status==='expirado'?'selected':''}>Expirado</option></select></div>
      </div>
      <div class="form-group"><label>Observações</label><textarea id="lic-obs">${l?.obs||''}</textarea></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-primary" onclick="salvarLicenca(${licId||'null'})"><i class="ti ti-check"></i> Salvar</button>
    </div>
  </div>`);
}
function editLicenca(id){ openModalLicenca(id); }
function salvarLicenca(id) {
  const nome=$('#lic-nome')?.value.trim(), forn=$('#lic-forn')?.value.trim(), venc=$('#lic-venc')?.value;
  if(!nome||!forn||!venc){ toast('Preencha nome, fornecedor e vencimento.','error'); return; }
  const data={ nome, fornecedor:forn, tipo:$('#lic-tipo')?.value, quantidade:parseInt($('#lic-qtd')?.value)||1, valor:parseFloat($('#lic-valor')?.value)||0, chave:$('#lic-chave')?.value, dataCompra:$('#lic-compra')?.value, vencimento:venc, unidade:$('#lic-unidade')?.value||'Matriz', status:$('#lic-status')?.value||'ativo', obs:$('#lic-obs')?.value };
  const dias=diasParaVencer(venc); if(dias<=30&&dias>0) data.status='vencendo'; if(dias<=0) data.status='expirado';
  if(id){ const l=STATE.licencas.find(l=>l.id===id); if(l) Object.assign(l,data); toast('Licença atualizada!'); }
  else { STATE.licencas.push({id:STATE.nextId.licenca++,...data}); toast('Licença cadastrada!'); }
  closeModal(); saveState(); renderPage('licencas');
}
function deleteLicenca(id){ if(!confirm('Excluir esta licença?')) return; STATE.licencas=STATE.licencas.filter(l=>l.id!==id); saveState(); renderPage('licencas'); toast('Licença excluída.','info'); }

// ===== MODALS: EQUIPAMENTO =====
function openModalEquipamento(unidadeFixa=null, equipId=null) {
  const e=equipId?STATE.equipamentos.find(e=>e.id===equipId):null;
  openModal(`
  <div class="modal modal-lg">
    <div class="modal-header"><span class="modal-title"><i class="ti ti-device-laptop"></i> ${e?'Editar Equipamento':'Novo Equipamento'}</span><button class="btn-icon" onclick="closeModal()"><i class="ti ti-x"></i></button></div>
    <div class="modal-body">
      <div class="form-group"><label class="required">Nome do Equipamento</label><input type="text" id="eq-nome" value="${e?.nome||''}"/></div>
      <div class="form-row">
        <div class="form-group"><label class="required">Tipo</label><select id="eq-tipo">${['Notebook','iPad','Projetor','Caixa de Som','Monitor','Impressora','Tablet','Switch','Roteador','Outro'].map(t=>`<option ${e?.tipo===t?'selected':''}>${t}</option>`).join('')}</select></div>
        <div class="form-group"><label class="required">Nº Patrimônio</label><input type="text" id="eq-pat" value="${e?.patrimonio||''}"/></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Marca</label><input type="text" id="eq-marca" value="${e?.marca||''}"/></div>
        <div class="form-group"><label>Modelo</label><input type="text" id="eq-modelo" value="${e?.modelo||''}"/></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Nº de Série</label><input type="text" id="eq-serie" value="${e?.serie||''}"/></div>
        <div class="form-group"><label>Local/Sala</label><input type="text" id="eq-local" value="${e?.local||''}"/></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="required">Unidade</label><select id="eq-unidade"><option value="Matriz" ${!e&&unidadeFixa!=='Ensino Médio'?'selected':e?.unidade==='Matriz'?'selected':''}>Matriz</option><option value="Ensino Médio" ${unidadeFixa==='Ensino Médio'||e?.unidade==='Ensino Médio'?'selected':''}>Ensino Médio</option></select></div>
        <div class="form-group"><label>Status</label><select id="eq-status">${['disponivel','reservado','manutencao','inativo'].map(s=>`<option value="${s}" ${e?.status===s?'selected':''}>${s}</option>`).join('')}</select></div>
      </div>
      <div class="form-group"><label>Descrição / Especificações</label><input type="text" id="eq-desc" value="${e?.descricao||''}"/></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-primary" onclick="salvarEquipamento(${equipId||'null'})"><i class="ti ti-check"></i> Salvar</button>
    </div>
  </div>`);
}
function editEquipamento(id){ openModalEquipamento(null, id); }
function salvarEquipamento(id) {
  const nome=$('#eq-nome')?.value.trim(), tipo=$('#eq-tipo')?.value, pat=$('#eq-pat')?.value.trim();
  if(!nome||!tipo||!pat){ toast('Preencha nome, tipo e patrimônio.','error'); return; }
  const data={ nome, tipo, patrimonio:pat, marca:$('#eq-marca')?.value, modelo:$('#eq-modelo')?.value, serie:$('#eq-serie')?.value, local:$('#eq-local')?.value, unidade:$('#eq-unidade')?.value||'Matriz', status:$('#eq-status')?.value||'disponivel', descricao:$('#eq-desc')?.value };
  if(id){ const e=STATE.equipamentos.find(e=>e.id===id); if(e) Object.assign(e,data); toast('Equipamento atualizado!'); }
  else { STATE.equipamentos.push({id:STATE.nextId.equipamento++,...data}); toast('Equipamento cadastrado!'); }
  closeModal(); saveState(); renderPage(STATE.currentPage);
}
function deleteEquipamento(id){ if(!confirm('Excluir este equipamento?')) return; STATE.equipamentos=STATE.equipamentos.filter(e=>e.id!==id); saveState(); renderPage(STATE.currentPage); toast('Excluído.','info'); }

// ===== MODALS: USUÁRIO =====
function openModalUsuario(userId=null) {
  const u=userId?STATE.users.find(u=>u.id===userId):null;
  openModal(`
  <div class="modal">
    <div class="modal-header"><span class="modal-title"><i class="ti ti-user-plus"></i> ${u?'Editar Usuário':'Novo Usuário'}</span><button class="btn-icon" onclick="closeModal()"><i class="ti ti-x"></i></button></div>
    <div class="modal-body">
      <div class="form-group"><label class="required">Nome Completo</label><input type="text" id="usr-nome" value="${u?.nome||''}"/></div>
      <div class="form-group"><label class="required">E-mail</label><input type="email" id="usr-email" value="${u?.email||''}"/></div>
      <div class="form-row">
        <div class="form-group"><label class="required">Nome de Usuário</label><input type="text" id="usr-login" placeholder="sem espaços" value="${u?.usuario||''}"/></div>
        <div class="form-group"><label class="required">Senha</label><input type="password" id="usr-senha" placeholder="${u?'Deixe em branco para manter':'Mínimo 6 caracteres'}" /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Perfil</label><select id="usr-role"><option value="usuario" ${!u||u.role==='usuario'?'selected':''}>Usuário</option><option value="admin" ${u?.role==='admin'?'selected':''}>Administrador</option></select></div>
        <div class="form-group"><label>Unidade</label><select id="usr-unidade"><option value="Matriz" ${!u||u.unidade==='Matriz'?'selected':''}>Matriz</option><option value="Ensino Médio" ${u?.unidade==='Ensino Médio'?'selected':''}>Ensino Médio</option></select></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-primary" onclick="salvarUsuario(${userId||'null'})"><i class="ti ti-check"></i> Salvar</button>
    </div>
  </div>`);
}
function editUsuario(id){ openModalUsuario(id); }
function salvarUsuario(id) {
  const nome=$('#usr-nome')?.value.trim(), email=$('#usr-email')?.value.trim(), login=$('#usr-login')?.value.trim(), senha=$('#usr-senha')?.value, role=$('#usr-role')?.value, unidade=$('#usr-unidade')?.value||'Matriz';
  if(!nome||!email||!login){ toast('Preencha nome, e-mail e usuário.','error'); return; }
  if(!id&&!senha){ toast('Defina uma senha.','error'); return; }
  if(senha&&senha.length<6){ toast('Senha mínimo 6 caracteres.','error'); return; }
  if(id){ const u=STATE.users.find(u=>u.id===id); if(u){ Object.assign(u,{nome,email,usuario:login,role,unidade}); if(senha) u.senha=senha; } toast('Usuário atualizado!'); }
  else {
    if(STATE.users.find(u=>u.usuario===login||u.email===email)){ toast('Usuário ou e-mail já existe.','error'); return; }
    STATE.users.push({id:STATE.nextId.usuario++,nome,email,usuario:login,senha,role,status:'ativo',unidade,criado:dateNow()});
    addNotification('Novo usuário cadastrado',nome,'ti-user-plus'); toast('Usuário criado!');
  }
  closeModal(); saveState(); renderPage('usuarios');
}
function deleteUsuario(id){ if(id===STATE.currentUser.id){ toast('Não pode excluir seu próprio usuário.','error'); return; } if(!confirm('Excluir usuário?')) return; STATE.users=STATE.users.filter(u=>u.id!==id); saveState(); renderPage('usuarios'); toast('Usuário excluído.','info'); }
function toggleUserStatus(id){ const u=STATE.users.find(u=>u.id===id); if(!u) return; u.status=u.status==='ativo'?'suspenso':'ativo'; saveState(); renderPage('usuarios'); toast(`Usuário ${u.status}.`,'info'); }

// ===== STATUS CHANGERS =====
function changeReservaStatus(id, status){ const r=STATE.reservas.find(r=>r.id===id); if(r){ r.status=status; saveState(); toast(`Reserva ${status}!`); } }
function changeChamadoStatus(id, status){ const c=STATE.chamados.find(c=>c.id===id); if(c){ c.status=status; c.atualizado=dateNow(); saveState(); toast(`Chamado ${status}!`); } }
function deleteReserva(id){ if(!confirm('Excluir reserva?')) return; STATE.reservas=STATE.reservas.filter(r=>r.id!==id); saveState(); renderPage(STATE.currentPage); toast('Reserva excluída.','info'); }
function deleteChamado(id){ if(!confirm('Excluir chamado?')) return; STATE.chamados=STATE.chamados.filter(c=>c.id!==id); saveState(); renderPage(STATE.currentPage); toast('Chamado excluído.','info'); }

// ===== ACTIONS DROPDOWN =====
function toggleMenu(btn) {
  $$('.actions-dropdown').forEach(d=>{ if(d!==btn.nextElementSibling) d.style.display='none'; });
  const m=btn.nextElementSibling; m.style.display=m.style.display==='none'?'':'none';
  if(m.style.display!=='none') setTimeout(()=>document.addEventListener('click',()=>m.style.display='none',{once:true}),10);
}

// ===== INIT =====
loadState();
// Auto-atualizar status de licenças ao carregar
STATE.licencas.forEach(l=>{ const d=diasParaVencer(l.vencimento); if(d<=0) l.status='expirado'; else if(d<=30) l.status='vencendo'; });
render();
