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
  nextId: { reserva: 4, chamado: 5, usuario: 4, equipamento: 7, inventario: 4, licenca: 4, acompanhamento: 1 },
  acompanhamentos: [], // { id, chamadoId, texto, autor, tipo, criado }
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
  o.addEventListener('mousedown', e=>{
    // Só fecha se: botão esquerdo (0) E clique direto no overlay escuro (não em filhos)
    if(e.button===0 && e.target===o) {
      // Aguarda mouseup para confirmar que não foi início de seleção de texto
      const onUp = ev => { if(ev.target===o) closeModal(id); o.removeEventListener('mouseup',onUp); };
      o.addEventListener('mouseup', onUp);
    }
  });
  // Impede que botão direito feche o modal
  o.addEventListener('contextmenu', e=>{ if(e.target===o) e.stopPropagation(); });
}
function closeModal(id='main-modal') { const e=$(`#${id}`); if(e) e.remove(); }

// ===== PERSISTENCE =====
function saveState() {
  try {
    localStorage.setItem('miro_ti_v2', JSON.stringify({ reservas:STATE.reservas, chamados:STATE.chamados, equipamentos:STATE.equipamentos, users:STATE.users, inventario:STATE.inventario, licencas:STATE.licencas, nextId:STATE.nextId, notifications:STATE.notifications.slice(0,30), acompanhamentos:STATE.acompanhamentos }));
    if (STATE.currentUser) localStorage.setItem('miro_ti_session', JSON.stringify({ userId: STATE.currentUser.id, page: STATE.currentPage }));
    else localStorage.removeItem('miro_ti_session');
  } catch(e) {}
}
function loadState() {
  try {
    const s = localStorage.getItem('miro_ti_v2');
    if (s) { const d=JSON.parse(s); ['reservas','chamados','equipamentos','users','inventario','licencas','nextId','notifications','acompanhamentos'].forEach(k=>{ if(d[k]) STATE[k]=d[k]; }); }
    const sess = localStorage.getItem('miro_ti_session');
    if (sess) {
      const { userId, page } = JSON.parse(sess);
      const user = STATE.users.find(u => u.id === userId && u.status === 'ativo');
      if (user) { STATE.currentUser = user; STATE.currentPage = page || 'dashboard'; }
    }
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
    <div class="auth-card auth-card-compact">
      <div class="auth-logo">
        <img src="logo.png" alt="Escola Miró" class="auth-logo-img-real" onerror="this.style.display='none'">
        <h1>TI - Escola Miró</h1>
        <p>Sistema de Chamados e Reservas</p>
      </div>
      <div class="form-group">
        <label>Usuário</label>
        <div class="input-icon"><i class="ti ti-user"></i><input id="login-user" type="text" placeholder="Seu Usuário" /></div>
      </div>
      <div class="form-group">
        <label>Senha</label>
        <div class="input-icon"><i class="ti ti-lock"></i><input id="login-pass" type="password" placeholder="••••••••" /></div>
      </div>
      <button class="btn btn-primary btn-full" id="btn-login"><i class="ti ti-login"></i> Entrar no sistema</button>
      <p style="text-align:center;margin-top:20px;font-size:12px;color:var(--gray-400)">
        Problemas de acesso? Fale com setor de TI:<br><strong>Tiago Souza</strong>
      </p>
      <div class="auth-copyright">
        Copyright &copy; 2026 Tiago Souza. Todos os direitos reservados.
      </div>
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
          <img src="logo.png" alt="Miró" class="sidebar-logo-img" onerror="this.style.display='none'">
          <div class="sidebar-logo-text"><h2>TI - Escola Miró</h2><span>Tiago Souza</span></div>
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

        <!-- MATRIZ SUBMENU -->
        <button class="nav-item nav-group-toggle ${['matriz','mz-reservas','mz-chamados','mz-equipamentos','mz-licencas','mz-usuarios','mz-relatorios'].includes(STATE.currentPage)?'active':''}" onclick="toggleNavGroup('grupo-matriz')">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-4a3 3 0 0 1 6 0v4"/><rect x="9" y="10" width="2" height="3"/><rect x="13" y="10" width="2" height="3"/></svg>
          Matriz
          <i class="ti ti-chevron-down nav-chevron" style="margin-left:auto;font-size:13px;transition:.2s"></i>
        </button>
        <div id="grupo-matriz" class="nav-group" style="display:${['matriz','mz-reservas','mz-chamados','mz-equipamentos','mz-licencas','mz-usuarios','mz-relatorios'].includes(STATE.currentPage)?'block':'none'}">
          <button class="nav-item nav-sub ${STATE.currentPage==='matriz'?'active':''}" data-page="matriz"><i class="ti ti-layout-dashboard"></i> Visão Geral</button>
          <button class="nav-item nav-sub ${STATE.currentPage==='mz-reservas'?'active':''}" data-page="mz-reservas"><i class="ti ti-calendar-event"></i> Reservas</button>
          <button class="nav-item nav-sub ${STATE.currentPage==='mz-chamados'?'active':''}" data-page="mz-chamados"><i class="ti ti-headset"></i> Chamados</button>
          <button class="nav-item nav-sub ${STATE.currentPage==='mz-equipamentos'?'active':''}" data-page="mz-equipamentos"><i class="ti ti-devices"></i> Equipamentos</button>
          <button class="nav-item nav-sub ${STATE.currentPage==='mz-licencas'?'active':''}" data-page="mz-licencas"><i class="ti ti-license"></i> Licenças</button>
          <button class="nav-item nav-sub ${STATE.currentPage==='mz-usuarios'?'active':''}" data-page="mz-usuarios"><i class="ti ti-users"></i> Usuários</button>
          <button class="nav-item nav-sub ${STATE.currentPage==='mz-relatorios'?'active':''}" data-page="mz-relatorios"><i class="ti ti-chart-bar"></i> Relatórios</button>
        </div>

        <!-- ENSINO MÉDIO SUBMENU -->
        <button class="nav-item nav-group-toggle ${['ensinomedio','em-reservas','em-chamados','em-equipamentos','em-licencas','em-usuarios','em-relatorios'].includes(STATE.currentPage)?'active':''}" onclick="toggleNavGroup('grupo-em')">
          <i class="ti ti-building"></i>
          Ensino Médio
          <i class="ti ti-chevron-down nav-chevron" style="margin-left:auto;font-size:13px;transition:.2s"></i>
        </button>
        <div id="grupo-em" class="nav-group" style="display:${['ensinomedio','em-reservas','em-chamados','em-equipamentos','em-licencas','em-usuarios','em-relatorios'].includes(STATE.currentPage)?'block':'none'}">
          <button class="nav-item nav-sub ${STATE.currentPage==='ensinomedio'?'active':''}" data-page="ensinomedio"><i class="ti ti-layout-dashboard"></i> Visão Geral</button>
          <button class="nav-item nav-sub ${STATE.currentPage==='em-reservas'?'active':''}" data-page="em-reservas"><i class="ti ti-calendar-event"></i> Reservas</button>
          <button class="nav-item nav-sub ${STATE.currentPage==='em-chamados'?'active':''}" data-page="em-chamados"><i class="ti ti-headset"></i> Chamados</button>
          <button class="nav-item nav-sub ${STATE.currentPage==='em-equipamentos'?'active':''}" data-page="em-equipamentos"><i class="ti ti-devices"></i> Equipamentos</button>
          <button class="nav-item nav-sub ${STATE.currentPage==='em-licencas'?'active':''}" data-page="em-licencas"><i class="ti ti-license"></i> Licenças</button>
          <button class="nav-item nav-sub ${STATE.currentPage==='em-usuarios'?'active':''}" data-page="em-usuarios"><i class="ti ti-users"></i> Usuários</button>
          <button class="nav-item nav-sub ${STATE.currentPage==='em-relatorios'?'active':''}" data-page="em-relatorios"><i class="ti ti-chart-bar"></i> Relatórios</button>
        </div>
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
      <footer class="main-footer">
        Copyright &copy; 2026 Tiago Souza. Todos os direitos reservados.
      </footer>
    </div>
  </div>`;
}

function attachLayoutEvents() {
  $$('.nav-item[data-page]').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.page));
  });
  $('#btn-logout').addEventListener('click', ()=>{ STATE.currentUser=null; STATE.currentPage='dashboard'; localStorage.removeItem('miro_ti_session'); render(); });
  const notifBtn = $('#notif-btn');
  if (notifBtn) notifBtn.addEventListener('click', e=>{ e.stopPropagation(); showNotifPanel(); });
  $('#btn-new-action').addEventListener('click', ()=>{
    const p = STATE.currentPage;
    if (['dashboard','reservas','calendario','novaReserva'].includes(p)) openModalReserva();
    else if (['chamados','novoChamado'].includes(p)) openModalChamado();
    else if (p==='inventario') openModalInventario();
    else if (p==='licencas') openModalLicenca();
    else if (p==='equipamentos'||p==='matriz'||p==='ensinomedio'||p==='mz-equipamentos'||p==='em-equipamentos') openModalEquipamento(p.startsWith('em-')?'Ensino Médio':'Matriz');
    else if (p==='mz-chamados'||p==='em-chamados') openModalChamado();
    else if (p==='mz-reservas'||p==='em-reservas') openModalReserva();
    else if (p==='mz-licencas'||p==='em-licencas') openModalLicenca();
    else if (p==='mz-usuarios'||p==='em-usuarios') openModalUsuario();
    else if (p==='usuarios') openModalUsuario();
    else openModalReserva();
  });
}

function navigateTo(page) {
  STATE.currentPage = page;
  const titles = { dashboard:'Dashboard', calendario:'Calendário', reservas:'Reservas', chamados:'Chamados', arquivados:'Arquivados', inventario:'Inventário TI', licencas:'Licenças de Software', matriz:'Matriz — Visão Geral', ensinomedio:'Ensino Médio — Visão Geral', equipamentos:'Equipamentos', usuarios:'Usuários', relatorios:'Relatórios & Gráficos', novaReserva:'Nova Reserva', novoChamado:'Abrir Chamado', meuschamados:'Meus Chamados', 'mz-reservas':'Matriz — Reservas', 'mz-chamados':'Matriz — Chamados', 'mz-equipamentos':'Matriz — Equipamentos', 'mz-licencas':'Matriz — Licenças', 'mz-usuarios':'Matriz — Usuários', 'mz-relatorios':'Matriz — Relatórios', 'em-reservas':'Ensino Médio — Reservas', 'em-chamados':'Ensino Médio — Chamados', 'em-equipamentos':'Ensino Médio — Equipamentos', 'em-licencas':'Ensino Médio — Licenças', 'em-usuarios':'Ensino Médio — Usuários', 'em-relatorios':'Ensino Médio — Relatórios' };
  const titleEl = $('#page-title');
  if (titleEl) titleEl.textContent = titles[page] || page;
  $$('.nav-item[data-page]').forEach(b=>b.classList.toggle('active', b.dataset.page===page));
  renderPage(page);
}

function renderPage(page) {
  const content = $('#page-content');
  if (!content) return;
  const pages = { dashboard, calendario, reservas, chamados, arquivados, inventario, licencas, matriz, ensinomedio, equipamentos, usuarios, relatorios, novaReserva, novoChamado, meuschamados,
    'mz-reservas': ()=>paginaUnidade('reservas','Matriz'),
    'mz-chamados': ()=>paginaUnidade('chamados','Matriz'),
    'mz-equipamentos': ()=>paginaUnidade('equipamentos','Matriz'),
    'mz-licencas': ()=>paginaUnidade('licencas','Matriz'),
    'mz-usuarios': ()=>paginaUnidade('usuarios','Matriz'),
    'mz-relatorios': ()=>paginaUnidade('relatorios','Matriz'),
    'em-reservas': ()=>paginaUnidade('reservas','Ensino Médio'),
    'em-chamados': ()=>paginaUnidade('chamados','Ensino Médio'),
    'em-equipamentos': ()=>paginaUnidade('equipamentos','Ensino Médio'),
    'em-licencas': ()=>paginaUnidade('licencas','Ensino Médio'),
    'em-usuarios': ()=>paginaUnidade('usuarios','Ensino Médio'),
    'em-relatorios': ()=>paginaUnidade('relatorios','Ensino Médio'),
  };
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
  if (page==='relatorios') setTimeout(()=>{ renderRelatorioCharts(); }, 200);
  if (page==='calendario') renderCalendario();
  if (page==='matriz') attachUnidadeFilter('Matriz');
  if (page==='ensinomedio') attachUnidadeFilter('Ensino Médio');
  if (page==='mz-equipamentos') attachUnidadeEquipFilter('Matriz');
  if (page==='em-equipamentos') attachUnidadeEquipFilter('Ensino Médio');
  if (page==='mz-relatorios') setTimeout(()=>renderUnidadeCharts('Matriz'),200);
  if (page==='em-relatorios') setTimeout(()=>renderUnidadeCharts('Ensino Médio'),200);
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

// ===== DASHBOARD USUÁRIO COMUM =====
function dashboardUsuario() {
  const u = STATE.currentUser;
  const minhasReservas = STATE.reservas.filter(r => r.solicitante === u.nome);
  const meusChamados = STATE.chamados.filter(c => c.solicitante === u.nome);
  const reservasAtivas = minhasReservas.filter(r => r.status === 'ativo');
  const chamadosAbertos = meusChamados.filter(c => c.status === 'aberto' || c.status === 'andamento');
  const hoje = dateNow();
  const reservasHoje = reservasAtivas.filter(r => r.dataInicio === hoje);

  return `
  <div class="stats-grid" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
    <div class="stat-card clickable" onclick="navigateTo('novaReserva')">
      <div class="stat-icon blue"><i class="ti ti-calendar-event"></i></div>
      <div class="stat-info"><div class="stat-number">${reservasAtivas.length}</div><div class="stat-label">Minhas Reservas</div></div>
      <i class="ti ti-arrow-right stat-arrow"></i>
    </div>
    <div class="stat-card clickable" onclick="navigateTo('meuschamados')">
      <div class="stat-icon red"><i class="ti ti-headset"></i></div>
      <div class="stat-info"><div class="stat-number">${chamadosAbertos.length}</div><div class="stat-label">Chamados Abertos</div></div>
      <i class="ti ti-arrow-right stat-arrow"></i>
    </div>
    <div class="stat-card clickable" onclick="navigateTo('meuschamados')">
      <div class="stat-icon green"><i class="ti ti-circle-check"></i></div>
      <div class="stat-info"><div class="stat-number">${meusChamados.filter(c=>c.status==='fechado').length}</div><div class="stat-label">Chamados Fechados</div></div>
      <i class="ti ti-arrow-right stat-arrow"></i>
    </div>
    <div class="stat-card">
      <div class="stat-icon orange"><i class="ti ti-calendar-today"></i></div>
      <div class="stat-info"><div class="stat-number">${reservasHoje.length}</div><div class="stat-label">Reservas Hoje</div></div>
    </div>
  </div>

  <div class="grid-2 mb-20" style="margin-top:0">
    <div class="card">
      <div class="card-header" style="background:var(--primary-light)">
        <span class="card-title"><i class="ti ti-calendar-event" style="color:var(--primary)"></i> Minhas Reservas Ativas</span>
        <button class="btn btn-primary btn-sm" onclick="openModalReserva()"><i class="ti ti-plus"></i> Nova</button>
      </div>
      <div class="card-body" style="padding:0">
        ${reservasAtivas.length === 0
          ? '<div class="empty-state"><i class="ti ti-calendar-off"></i><h3>Nenhuma reserva ativa</h3><p>Clique em Nova Reserva para criar.</p></div>'
          : reservasAtivas.slice(0,8).map(r=>`
            <div class="today-item" style="padding:12px 16px">
              <div class="today-item-icon" style="background:var(--primary-light);color:var(--primary)">
                <i class="ti ti-device-laptop"></i>
              </div>
              <div class="today-item-info">
                <div class="today-item-title">${r.equipamento}</div>
                <div class="today-item-sub">${r.sala} · ${formatDate(r.dataInicio)} · ${r.horaInicio}–${r.horaFim}</div>
              </div>
              <span class="badge badge-${r.status}">${r.status}</span>
            </div>`).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-header" style="background:var(--primary-light)">
        <span class="card-title"><i class="ti ti-headset" style="color:var(--primary)"></i> Meus Chamados</span>
        <button class="btn btn-primary btn-sm" onclick="openModalChamado()"><i class="ti ti-plus"></i> Novo</button>
      </div>
      <div class="card-body" style="padding:0">
        ${meusChamados.length === 0
          ? '<div class="empty-state"><i class="ti ti-mood-happy"></i><h3>Nenhum chamado</h3></div>'
          : meusChamados.slice(0,8).map(c=>`
            <div class="today-item" style="padding:12px 16px">
              <div class="today-item-icon" style="background:${c.status==='fechado'?'var(--success-bg)':c.prioridade==='Alta'?'var(--danger-bg)':'var(--warning-bg)'};color:${c.status==='fechado'?'var(--success)':c.prioridade==='Alta'?'var(--danger)':'var(--warning)'}">
                <i class="ti ${c.status==='fechado'?'ti-check':'ti-urgent'}"></i>
              </div>
              <div class="today-item-info">
                <div class="today-item-title">${c.titulo}</div>
                <div class="today-item-sub">${c.categoria} · ${formatDate(c.criado)} · ${c.atribuido?'Atribuído: '+c.atribuido:'Aguardando atribuição'}</div>
              </div>
              <span class="badge badge-${c.status}">${c.status}</span>
            </div>`).join('')}
      </div>
    </div>
  </div>`;
}

// ===== DASHBOARD =====
function dashboard() {
  if (STATE.currentUser && STATE.currentUser.role !== 'admin') return dashboardUsuario();
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
const CARGOS=['Professor(a)','Coordenador(a)','Assistente','Estagiário(a)','Administrativo','Aluno'];
const SALAS=['Grupo 1','Grupo 2','Grupo 3','Grupo 4','Grupo 5','1º Ano','2º Ano','3º Ano','4º Ano','5º Ano','6º Ano','7º Ano','8º Ano','9º Ano','1º Ano EM','2º Ano EM','3º Ano EM','Aula de Apoio','Outro'];
const HORAS=(()=>{const h=[];for(let i=6;i<24;i++)for(let m=0;m<60;m+=5)h.push(`${String(i).padStart(2,'0')}:${String(m).padStart(2,'0')}`);return h;})();

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
          <button onclick="openModalAcompanhamento(${c.id})"><i class="ti ti-message-circle"></i> Acompanhamentos</button>
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
    <div class="table-wrapper"><table><thead><tr><th>Nome</th><th>Tipo</th><th>Patrimônio</th><th>Marca/Modelo</th><th>Local</th><th>Unidade</th><th>Qtd</th><th>Status</th><th>Ações</th></tr></thead>
    <tbody id="equip-tbody">${renderEquipRows(STATE.equipamentos)}</tbody></table></div>
  </div>`;
}

function equipStatus(s){ const m={disponivel:'badge-fechado',reservado:'badge-reservado',manutencao:'badge-andamento',inativo:'badge-suspenso'}; const l={disponivel:'Disponível',reservado:'Reservado',manutencao:'Manutenção',inativo:'Inativo'}; return `<span class="badge ${m[s]||'badge-cancelado'}">${l[s]||s}</span>`; }

function renderEquipRows(list) {
  if(!list.length) return `<tr><td colspan="9"><div class="empty-state"><i class="ti ti-devices-off"></i><h3>Nenhum equipamento</h3></div></td></tr>`;
  return list.map(e=>`<tr>
    <td><strong>${e.nome}</strong></td><td>${e.tipo}</td>
    <td><code style="background:var(--gray-100);padding:2px 6px;border-radius:4px;font-size:12px">${e.patrimonio}</code></td>
    <td>${e.marca||'—'} ${e.modelo||''}</td><td>${e.local||'—'}</td><td>${e.unidade}</td>
    <td><strong>${e.quantidade||1}</strong></td>
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
  const now = new Date().toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'});
  return `
  <!-- BARRA DE CONTROLE -->
  <div class="rel-toolbar no-print">
    <!-- MODO -->
    <div class="rel-mode-switch">
      <button class="rel-mode-btn active" id="btn-modo-graficos" onclick="setRelMode('graficos')">
        <i class="ti ti-chart-bar"></i> Gráficos
      </button>
      <button class="rel-mode-btn" id="btn-modo-dados" onclick="setRelMode('dados')">
        <i class="ti ti-table"></i> Dados
      </button>
    </div>
    <!-- TIPO (só aparece no modo dados) -->
    <div id="rel-tipo-wrap" style="display:none;align-items:center;gap:8px">
      <label style="font-size:13px;font-weight:600;color:var(--gray-600)">Relatório:</label>
      <select class="filter-select" id="rel-tipo" onchange="switchRelatorio(this.value)" style="font-weight:700;color:var(--primary)">
        <option value="chamados">Chamados</option>
        <option value="reservas">Reservas</option>
        <option value="inventario">Inventário TI</option>
        <option value="licencas">Licenças</option>
        <option value="equipamentos">Equipamentos</option>
      </select>
    </div>
    <!-- FILTROS COMUNS -->
    <select class="filter-select" id="rel-uni">
      <option value="">Todas as unidades</option>
      <option value="Matriz">Matriz</option>
      <option value="Ensino Médio">Ensino Médio</option>
    </select>
    <select class="filter-select" id="rel-status-f">
      <option value="">Todos os status</option>
      <option value="aberto">Aberto</option>
      <option value="andamento">Em Andamento</option>
      <option value="pendente">Pendente</option>
      <option value="fechado">Fechado</option>
      <option value="ativo">Ativo</option>
      <option value="suspenso">Suspenso</option>
    </select>
    <div style="display:flex;align-items:center;gap:6px">
      <span style="font-size:12px;color:var(--gray-500)">De</span>
      <input type="date" class="filter-select" id="rel-de" style="width:140px"/>
      <span style="font-size:12px;color:var(--gray-500)">até</span>
      <input type="date" class="filter-select" id="rel-ate" value="${dateNow()}" style="width:140px"/>
    </div>
    <button class="btn btn-primary" onclick="gerarRelatorio()"><i class="ti ti-refresh"></i> Atualizar</button>
    <div style="margin-left:auto;display:flex;gap:8px">
      <button class="btn btn-ghost" onclick="window.print()"><i class="ti ti-printer"></i> Imprimir / PDF</button>
    </div>
  </div>

  <!-- ÁREA DO RELATÓRIO -->
  <div id="rel-content">
    ${renderRelGraficos()}
  </div>`;
}

// ============================================================
// MODO: GRÁFICOS
// ============================================================
function renderRelGraficos() {
  const now = new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long',year:'numeric'});
  const hora = new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
  const totalCh = STATE.chamados.length;
  const totalRes = STATE.reservas.length;
  const totalInv = STATE.inventario.length;
  const totalLic = STATE.licencas.length;
  const totalEq = STATE.equipamentos.length;
  const totalUsers = STATE.users.filter(u=>u.status==='ativo').length;
  const licVencendo = STATE.licencas.filter(l=>diasParaVencer(l.vencimento)<=30&&diasParaVencer(l.vencimento)>0).length;
  const chAbertos = STATE.chamados.filter(c=>c.status==='aberto').length;
  const chFechados = STATE.chamados.filter(c=>c.status==='fechado').length;

  return `
  <!-- CABEÇALHO INSTITUCIONAL -->
  <div class="rel-print-header">
    <div class="rel-print-logo">
      <img src="logo.png" alt="Escola Miró" style="height:60px;object-fit:contain" onerror="this.style.display='none'">
    </div>
    <div class="rel-print-info">
      <h1>TI — Escola Miró</h1>
      <h2>Relatório Executivo — Visão Geral</h2>
      <p>Responsável TI: <strong>Tiago Souza</strong> &nbsp;|&nbsp; Emitido em: <strong>${now}, ${hora}</strong></p>
    </div>
  </div>

  <!-- KPIs GERAIS -->
  <div class="rel-kpi-grid">
    <div class="rel-kpi blue"><div class="rel-kpi-num">${totalCh}</div><div class="rel-kpi-label">Total de Chamados</div></div>
    <div class="rel-kpi green"><div class="rel-kpi-num">${chFechados}</div><div class="rel-kpi-label">Chamados Fechados</div></div>
    <div class="rel-kpi red"><div class="rel-kpi-num">${chAbertos}</div><div class="rel-kpi-label">Chamados Abertos</div></div>
    <div class="rel-kpi teal"><div class="rel-kpi-num">${totalRes}</div><div class="rel-kpi-label">Total de Reservas</div></div>
    <div class="rel-kpi purple"><div class="rel-kpi-num">${totalEq}</div><div class="rel-kpi-label">Equipamentos</div></div>
    <div class="rel-kpi orange"><div class="rel-kpi-num">${totalInv}</div><div class="rel-kpi-label">Itens no Inventário</div></div>
    <div class="rel-kpi blue"><div class="rel-kpi-num">${totalLic}</div><div class="rel-kpi-label">Licenças de Software</div></div>
    <div class="rel-kpi ${licVencendo>0?'red':'green'}"><div class="rel-kpi-num">${licVencendo}</div><div class="rel-kpi-label">Licenças a Vencer</div></div>
  </div>

  <!-- GRÁFICOS LINHA 1 -->
  <div class="grid-2 mb-20">
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="ti ti-chart-line"></i> Chamados por Mês (Ano Atual)</span></div>
      <div class="card-body"><div class="chart-container" style="height:220px"><canvas id="chart-mensal"></canvas></div></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="ti ti-chart-donut"></i> Status dos Chamados</span></div>
      <div class="card-body"><div class="chart-container" style="height:220px"><canvas id="chart-status-rel"></canvas></div></div>
    </div>
  </div>

  <!-- GRÁFICOS LINHA 2 -->
  <div class="grid-2 mb-20">
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="ti ti-chart-pie"></i> Chamados por Prioridade</span></div>
      <div class="card-body"><div class="chart-container" style="height:220px"><canvas id="chart-prio"></canvas></div></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="ti ti-chart-bar"></i> Chamados por Categoria</span></div>
      <div class="card-body"><div class="chart-container" style="height:220px"><canvas id="chart-cat-rel"></canvas></div></div>
    </div>
  </div>

  <!-- GRÁFICOS LINHA 3 -->
  <div class="grid-2 mb-20">
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="ti ti-chart-bar"></i> Reservas por Tipo de Equipamento</span></div>
      <div class="card-body"><div class="chart-container" style="height:220px"><canvas id="chart-equip-uso"></canvas></div></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="ti ti-user-check"></i> Chamados por Usuário</span></div>
      <div class="card-body"><div class="chart-container" style="height:220px"><canvas id="chart-user"></canvas></div></div>
    </div>
  </div>

  <!-- GRÁFICOS LINHA 4 -->
  <div class="grid-2 mb-20">
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="ti ti-chart-donut"></i> Distribuição por Unidade</span></div>
      <div class="card-body"><div class="chart-container" style="height:220px"><canvas id="chart-unidade"></canvas></div></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="ti ti-license"></i> Licenças — Dias Restantes</span></div>
      <div class="card-body"><div class="chart-container" style="height:220px"><canvas id="chart-lic"></canvas></div></div>
    </div>
  </div>

  <!-- GRÁFICOS LINHA 5 -->
  <div class="grid-2 mb-20">
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="ti ti-chart-bar"></i> Equipamentos por Status</span></div>
      <div class="card-body"><div class="chart-container" style="height:220px"><canvas id="chart-equip-status"></canvas></div></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="ti ti-chart-line"></i> Reservas por Mês</span></div>
      <div class="card-body"><div class="chart-container" style="height:220px"><canvas id="chart-res-mensal"></canvas></div></div>
    </div>
  </div>

  <!-- RODAPÉ DE IMPRESSÃO -->
  <div class="rel-print-footer">
    <p>TI - Escola Miró &nbsp;|&nbsp; Responsável: Tiago Souza &nbsp;|&nbsp; Gerado em: ${now}, ${hora}</p>
    <p>Copyright &copy; 2026 Tiago Souza. Todos os direitos reservados.</p>
  </div>`;
}

// ============================================================
// MODO: DADOS
// ============================================================
function renderRelDados(tipo) {
  tipo = tipo || document.getElementById('rel-tipo')?.value || 'chamados';
  const map = { chamados: renderRelChamados, reservas: renderRelReservas, inventario: renderRelInventario, licencas: renderRelLicencas, equipamentos: renderRelEquipamentos };
  return map[tipo] ? map[tipo]() : '';
}

function setRelMode(modo) {
  document.getElementById('btn-modo-graficos')?.classList.toggle('active', modo==='graficos');
  document.getElementById('btn-modo-dados')?.classList.toggle('active', modo==='dados');
  const tipoWrap = document.getElementById('rel-tipo-wrap');
  if (tipoWrap) tipoWrap.style.display = modo==='dados' ? 'flex' : 'none';
  const el = document.getElementById('rel-content');
  if (!el) return;
  if (modo === 'graficos') {
    el.innerHTML = renderRelGraficos();
    setTimeout(renderRelatorioCharts, 100);
  } else {
    const tipo = document.getElementById('rel-tipo')?.value || 'chamados';
    el.innerHTML = renderRelDados(tipo);
  }
}

function switchRelatorio(tipo) {
  const el = document.getElementById('rel-content');
  if (el) el.innerHTML = renderRelDados(tipo);
}

function gerarRelatorio() {
  const modoGraf = document.getElementById('btn-modo-graficos')?.classList.contains('active');
  const el = document.getElementById('rel-content');
  if (!el) return;
  if (modoGraf) {
    el.innerHTML = renderRelGraficos();
    setTimeout(renderRelatorioCharts, 100);
  } else {
    const tipo = document.getElementById('rel-tipo')?.value || 'chamados';
    el.innerHTML = renderRelDados(tipo);
  }
  toast('Relatório atualizado!', 'success');
}

function getRelFiltros() {
  return {
    uni: document.getElementById('rel-uni')?.value || '',
    st:  document.getElementById('rel-status-f')?.value || '',
    de:  document.getElementById('rel-de')?.value || '',
    ate: document.getElementById('rel-ate')?.value || '',
  };
}

function filterByDate(list, campo, de, ate) {
  return list.filter(item => {
    const d = item[campo] || '';
    if (de && d < de) return false;
    if (ate && d > ate) return false;
    return true;
  });
}

// ============================================================
// HELPER: cabeçalho de impressão por tipo
// ============================================================
function relPrintHeader(titulo) {
  const now = new Date().toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit',year:'numeric'});
  const hora = new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
  return `
  <div class="rel-print-header">
    <div class="rel-print-logo">
      <img src="logo.png" alt="Escola Miró" style="height:55px;object-fit:contain" onerror="this.style.display='none'">
    </div>
    <div class="rel-print-info">
      <h1>TI — Escola Miró</h1>
      <h2>${titulo}</h2>
      <p>Responsável TI: <strong>Tiago Souza</strong> &nbsp;|&nbsp; Emitido em: <strong>${now} às ${hora}</strong></p>
    </div>
  </div>`;
}

function relPrintFooter() {
  const now = new Date().toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit',year:'numeric'});
  const hora = new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
  return `<div class="rel-print-footer"><p>TI - Escola Miró &nbsp;|&nbsp; Responsável: Tiago Souza &nbsp;|&nbsp; ${now} às ${hora}</p><p>Copyright &copy; 2026 Tiago Souza. Todos os direitos reservados.</p></div>`;
}

// ============================================================
// RELATÓRIO: CHAMADOS
// ============================================================
function renderRelChamados() {
  const f = getRelFiltros();
  let list = STATE.chamados;
  if (f.uni) list = list.filter(c => (c.unidade||'Matriz') === f.uni);
  if (f.st)  list = list.filter(c => c.status === f.st);
  list = filterByDate(list, 'criado', f.de, f.ate);
  const total=list.length;
  const abertos=list.filter(c=>c.status==='aberto').length;
  const andamento=list.filter(c=>c.status==='andamento').length;
  const fechados=list.filter(c=>c.status==='fechado').length;
  const suspensos=list.filter(c=>c.status==='suspenso').length;
  const alta=list.filter(c=>c.prioridade==='Alta').length;
  const media=list.filter(c=>c.prioridade==='Media').length;
  const baixa=list.filter(c=>c.prioridade==='Baixa').length;
  const periodo = f.de && f.ate ? `${formatDate(f.de)} a ${formatDate(f.ate)}` : f.de ? `A partir de ${formatDate(f.de)}` : f.ate ? `Até ${formatDate(f.ate)}` : 'Todo o período';
  const unidLabel = f.uni || 'Todas as unidades';
  return `
  ${relPrintHeader('Relatório Detalhado de Chamados')}
  <!-- RESUMO DO FILTRO -->
  <div class="rel-filter-summary">
    <span><i class="ti ti-filter"></i> Filtros aplicados:</span>
    <span class="rel-filter-tag"><i class="ti ti-building"></i> ${unidLabel}</span>
    <span class="rel-filter-tag"><i class="ti ti-calendar"></i> ${periodo}</span>
    ${f.st ? `<span class="rel-filter-tag"><i class="ti ti-circle"></i> Status: ${f.st}</span>` : ''}
  </div>

  <!-- KPIs -->
  <div class="rel-kpi-grid">
    <div class="rel-kpi blue"><div class="rel-kpi-num">${total}</div><div class="rel-kpi-label">Total de Chamados</div></div>
    <div class="rel-kpi red"><div class="rel-kpi-num">${abertos}</div><div class="rel-kpi-label">Abertos</div></div>
    <div class="rel-kpi orange"><div class="rel-kpi-num">${andamento}</div><div class="rel-kpi-label">Em Andamento</div></div>
    <div class="rel-kpi green"><div class="rel-kpi-num">${fechados}</div><div class="rel-kpi-label">Fechados</div></div>
    <div class="rel-kpi gray"><div class="rel-kpi-num">${suspensos}</div><div class="rel-kpi-label">Suspensos</div></div>
    <div class="rel-kpi red"><div class="rel-kpi-num">${alta}</div><div class="rel-kpi-label">Prioridade Alta</div></div>
    <div class="rel-kpi orange"><div class="rel-kpi-num">${media}</div><div class="rel-kpi-label">Prioridade Média</div></div>
    <div class="rel-kpi green"><div class="rel-kpi-num">${baixa}</div><div class="rel-kpi-label">Prioridade Baixa</div></div>
  </div>

  <!-- TABELA COMPLETA -->
  <div class="card mb-20">
    <div class="card-header" style="background:var(--primary);padding:14px 20px">
      <span class="card-title" style="color:white;font-size:15px"><i class="ti ti-headset"></i> Chamados — Detalhamento Completo (${total} registros)</span>
    </div>
    <div class="table-wrapper">
      <table class="rel-table">
        <thead>
          <tr>
            <th style="width:40px">#</th>
            <th>Título</th>
            <th>Descrição Completa</th>
            <th>Categoria</th>
            <th>Prioridade</th>
            <th>Solicitante</th>
            <th>Atribuído</th>
            <th>Unidade</th>
            <th>Status</th>
            <th>Data Abertura</th>
            <th>Última Atualização</th>
          </tr>
        </thead>
        <tbody>
          ${list.length === 0
            ? '<tr><td colspan="11"><div class="empty-state"><i class="ti ti-mood-happy"></i><h3>Nenhum chamado no período</h3></div></td></tr>'
            : list.map((c,i)=>`
            <tr class="${i%2===1?'rel-row-alt':''}">
              <td><strong style="color:var(--primary);font-size:13px">#${c.id}</strong></td>
              <td><strong style="font-size:13px">${c.titulo}</strong></td>
              <td style="font-size:12px;color:var(--gray-600);max-width:220px;line-height:1.4">${c.descricao}</td>
              <td><span class="badge badge-reservado" style="font-size:11px">${c.categoria}</span></td>
              <td><span class="rel-prio rel-prio-${c.prioridade.toLowerCase()}">${c.prioridade}</span></td>
              <td style="font-size:13px"><strong>${c.solicitante}</strong></td>
              <td style="font-size:12px">${c.atribuido||'<span style="color:var(--gray-400)">Não atribuído</span>'}</td>
              <td style="font-size:12px">${c.unidade||'Matriz'}</td>
              <td><span class="badge badge-${c.status}" style="font-size:11px">${c.status}</span></td>
              <td style="font-size:12px;white-space:nowrap">${formatDate(c.criado)}</td>
              <td style="font-size:12px;white-space:nowrap">${formatDate(c.atualizado)}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
  ${relPrintFooter()}`;
}

// ============================================================
// RELATÓRIO: RESERVAS
// ============================================================
function renderRelReservas() {
  const f = getRelFiltros();
  let list = STATE.reservas;
  if (f.uni) list = list.filter(r => (r.unidade||'Matriz') === f.uni);
  if (f.st)  list = list.filter(r => r.status === f.st);
  list = filterByDate(list, 'dataInicio', f.de, f.ate);
  const total=list.length;
  const ativas=list.filter(r=>r.status==='ativo').length;
  const fechadas=list.filter(r=>r.status==='fechado').length;
  const suspensos=list.filter(r=>r.status==='suspenso').length;
  const qtdTotal=list.reduce((a,r)=>a+(r.quantidade||1),0);
  const equipsDistintos=[...new Set(list.map(r=>r.equipamento))].length;
  const solicitDistintos=[...new Set(list.map(r=>r.solicitante))].length;
  const periodo = f.de && f.ate ? `${formatDate(f.de)} a ${formatDate(f.ate)}` : 'Todo o período';
  return `
  ${relPrintHeader('Relatório Detalhado de Reservas')}
  <div class="rel-filter-summary">
    <span><i class="ti ti-filter"></i> Filtros:</span>
    <span class="rel-filter-tag"><i class="ti ti-building"></i> ${f.uni||'Todas as unidades'}</span>
    <span class="rel-filter-tag"><i class="ti ti-calendar"></i> ${periodo}</span>
    ${f.st ? `<span class="rel-filter-tag">Status: ${f.st}</span>` : ''}
  </div>

  <div class="rel-kpi-grid">
    <div class="rel-kpi blue"><div class="rel-kpi-num">${total}</div><div class="rel-kpi-label">Total de Reservas</div></div>
    <div class="rel-kpi green"><div class="rel-kpi-num">${ativas}</div><div class="rel-kpi-label">Reservas Ativas</div></div>
    <div class="rel-kpi gray"><div class="rel-kpi-num">${fechadas}</div><div class="rel-kpi-label">Concluídas</div></div>
    <div class="rel-kpi orange"><div class="rel-kpi-num">${suspensos}</div><div class="rel-kpi-label">Suspensas</div></div>
    <div class="rel-kpi teal"><div class="rel-kpi-num">${qtdTotal}</div><div class="rel-kpi-label">Itens Reservados (total)</div></div>
    <div class="rel-kpi purple"><div class="rel-kpi-num">${equipsDistintos}</div><div class="rel-kpi-label">Equipamentos Distintos</div></div>
    <div class="rel-kpi blue"><div class="rel-kpi-num">${solicitDistintos}</div><div class="rel-kpi-label">Solicitantes Distintos</div></div>
    <div class="rel-kpi teal"><div class="rel-kpi-num">${[...new Set(list.map(r=>r.sala))].length}</div><div class="rel-kpi-label">Salas/Turmas</div></div>
  </div>

  <div class="card mb-20">
    <div class="card-header" style="background:var(--primary);padding:14px 20px">
      <span class="card-title" style="color:white;font-size:15px"><i class="ti ti-calendar-event"></i> Reservas — Detalhamento Completo (${total} registros)</span>
    </div>
    <div class="table-wrapper">
      <table class="rel-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Equipamento</th>
            <th>Tipo</th>
            <th>Solicitante</th>
            <th>Cargo</th>
            <th>Sala / Turma</th>
            <th>Data Reserva</th>
            <th>Horário Início</th>
            <th>Horário Fim</th>
            <th>Duração</th>
            <th>Quantidade</th>
            <th>Unidade</th>
            <th>Status</th>
            <th>Data Cadastro</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          ${list.length === 0
            ? '<tr><td colspan="15"><div class="empty-state"><i class="ti ti-calendar-off"></i><h3>Nenhuma reserva no período</h3></div></td></tr>'
            : list.map((r,i)=>{
                const hi=r.horaInicio||'00:00', hf=r.horaFim||'00:00';
                const [hhi,mmi]=hi.split(':').map(Number);
                const [hhf,mmf]=hf.split(':').map(Number);
                const dur=((hhf*60+mmf)-(hhi*60+mmi));
                const durStr=dur>0?`${Math.floor(dur/60)}h${dur%60>0?String(dur%60).padStart(2,'0')+'min':''}`:'-';
                return `<tr class="${i%2===1?'rel-row-alt':''}">
                  <td><strong style="color:var(--primary)">#${r.id}</strong></td>
                  <td><strong style="font-size:13px">${r.equipamento}</strong></td>
                  <td><span class="badge badge-reservado" style="font-size:11px">${r.equipamentoTipo}</span></td>
                  <td style="font-size:13px"><strong>${r.solicitante}</strong></td>
                  <td style="font-size:12px;color:var(--gray-500)">${r.cargo}</td>
                  <td style="font-size:13px"><strong>${r.sala}</strong></td>
                  <td style="font-size:12px;white-space:nowrap"><strong>${formatDate(r.dataInicio)}</strong></td>
                  <td style="font-size:13px;text-align:center"><strong>${r.horaInicio}</strong></td>
                  <td style="font-size:13px;text-align:center"><strong>${r.horaFim}</strong></td>
                  <td style="font-size:12px;text-align:center;color:var(--primary)">${durStr}</td>
                  <td style="text-align:center"><strong style="font-size:14px">${r.quantidade||1}</strong></td>
                  <td style="font-size:12px">${r.unidade||'Matriz'}</td>
                  <td><span class="badge badge-${r.status}" style="font-size:11px">${r.status}</span></td>
                  <td style="font-size:11px;color:var(--gray-400)">${formatDate(r.criado)}</td>
                  <td style="font-size:12px;color:var(--gray-500)">${r.obs||'—'}</td>
                </tr>`;
              }).join('')}
        </tbody>
      </table>
    </div>
  </div>
  ${relPrintFooter()}`;
}

// ============================================================
// RELATÓRIO: INVENTÁRIO
// ============================================================
function renderRelInventario() {
  const f = getRelFiltros();
  let list = STATE.inventario;
  if (f.uni) list = list.filter(i => i.unidade === f.uni);
  if (f.st)  list = list.filter(i => i.status === f.st);
  const cats={};
  list.forEach(i=>{ cats[i.categoria]=(cats[i.categoria]||0)+1; });
  return `
  ${relPrintHeader('Relatório de Inventário TI')}
  <div class="rel-filter-summary">
    <span><i class="ti ti-filter"></i> Filtros:</span>
    <span class="rel-filter-tag">${f.uni||'Todas as unidades'}</span>
    ${f.st ? `<span class="rel-filter-tag">Status: ${f.st}</span>` : ''}
  </div>

  <div class="rel-kpi-grid">
    <div class="rel-kpi blue"><div class="rel-kpi-num">${list.length}</div><div class="rel-kpi-label">Total de Itens</div></div>
    <div class="rel-kpi green"><div class="rel-kpi-num">${list.filter(i=>i.status==='ativo').length}</div><div class="rel-kpi-label">Ativos</div></div>
    <div class="rel-kpi orange"><div class="rel-kpi-num">${list.filter(i=>i.status==='manutencao').length}</div><div class="rel-kpi-label">Em Manutenção</div></div>
    <div class="rel-kpi red"><div class="rel-kpi-num">${list.filter(i=>i.status==='inativo').length}</div><div class="rel-kpi-label">Inativos</div></div>
    <div class="rel-kpi teal"><div class="rel-kpi-num">${list.filter(i=>i.categoria==='Rede').length}</div><div class="rel-kpi-label">Equipamentos de Rede</div></div>
    <div class="rel-kpi orange"><div class="rel-kpi-num">${list.filter(i=>i.categoria==='Impressora').length}</div><div class="rel-kpi-label">Impressoras</div></div>
    <div class="rel-kpi red"><div class="rel-kpi-num">${list.filter(i=>diasParaVencer(i.garantia)<90&&diasParaVencer(i.garantia)>0).length}</div><div class="rel-kpi-label">Garantia a Vencer</div></div>
    <div class="rel-kpi purple"><div class="rel-kpi-num">${Object.keys(cats).length}</div><div class="rel-kpi-label">Categorias</div></div>
  </div>

  <!-- SUMÁRIO POR CATEGORIA -->
  <div class="card mb-20">
    <div class="card-header"><span class="card-title"><i class="ti ti-chart-bar"></i> Resumo por Categoria</span></div>
    <div class="card-body">
      <div style="display:flex;flex-wrap:wrap;gap:10px">
        ${Object.entries(cats).map(([cat,qtd])=>`
        <div style="background:var(--primary-light);border:1px solid var(--primary-mid);border-radius:8px;padding:10px 16px;display:flex;align-items:center;gap:10px">
          <span style="font-size:22px;font-weight:800;color:var(--primary)">${qtd}</span>
          <span style="font-size:13px;font-weight:600;color:var(--gray-700)">${cat}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <div class="card mb-20">
    <div class="card-header" style="background:var(--primary);padding:14px 20px">
      <span class="card-title" style="color:white;font-size:15px"><i class="ti ti-server"></i> Inventário Completo — Todos os Campos (${list.length} itens)</span>
    </div>
    <div class="table-wrapper">
      <table class="rel-table">
        <thead>
          <tr>
            <th>Nome do Equipamento</th>
            <th>Categoria</th>
            <th>Tipo</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Nº Patrimônio</th>
            <th>Nº de Série</th>
            <th>Endereço IP</th>
            <th>Local / Sala</th>
            <th>Unidade</th>
            <th>Garantia até</th>
            <th>Status</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          ${list.length === 0
            ? '<tr><td colspan="13"><div class="empty-state"><i class="ti ti-server-off"></i><h3>Nenhum item</h3></div></td></tr>'
            : list.map((i,idx)=>{
                const gd=diasParaVencer(i.garantia);
                const gc=gd<30?'var(--danger)':gd<90?'var(--warning)':'inherit';
                return `<tr class="${idx%2===1?'rel-row-alt':''}">
                  <td><strong style="font-size:13px">${i.nome}</strong></td>
                  <td><span class="badge badge-reservado" style="font-size:11px">${i.categoria}</span></td>
                  <td style="font-size:12px">${i.tipo||'—'}</td>
                  <td style="font-size:13px"><strong>${i.marca||'—'}</strong></td>
                  <td style="font-size:12px">${i.modelo||'—'}</td>
                  <td><code style="font-size:11px;background:var(--gray-100);padding:2px 5px;border-radius:4px">${i.patrimonio}</code></td>
                  <td style="font-size:11px;color:var(--gray-500)">${i.serie||'—'}</td>
                  <td><code style="font-size:11px">${i.ip||'—'}</code></td>
                  <td style="font-size:12px">${i.local||'—'}</td>
                  <td style="font-size:12px">${i.unidade}</td>
                  <td style="font-size:12px;color:${gc};font-weight:600">${formatDate(i.garantia)||'—'}</td>
                  <td><span class="badge badge-${i.status==='ativo'?'fechado':i.status==='inativo'?'suspenso':'andamento'}" style="font-size:11px">${i.status}</span></td>
                  <td style="font-size:11px;color:var(--gray-500)">${i.obs||'—'}</td>
                </tr>`;
              }).join('')}
        </tbody>
      </table>
    </div>
  </div>
  ${relPrintFooter()}`;
}

// ============================================================
// RELATÓRIO: LICENÇAS
// ============================================================
function renderRelLicencas() {
  const f = getRelFiltros();
  let list = STATE.licencas;
  if (f.uni) list = list.filter(l => l.unidade === f.uni);
  if (f.st)  list = list.filter(l => l.status === f.st);
  const totalValor = list.reduce((a,l)=>a+l.valor,0);
  const totalQtd   = list.reduce((a,l)=>a+(l.quantidade||0),0);
  return `
  ${relPrintHeader('Relatório de Licenças de Software')}
  <div class="rel-filter-summary">
    <span><i class="ti ti-filter"></i> Filtros:</span>
    <span class="rel-filter-tag">${f.uni||'Todas as unidades'}</span>
    ${f.st ? `<span class="rel-filter-tag">Status: ${f.st}</span>` : ''}
  </div>

  <div class="rel-kpi-grid">
    <div class="rel-kpi blue"><div class="rel-kpi-num">${list.length}</div><div class="rel-kpi-label">Total de Licenças</div></div>
    <div class="rel-kpi green"><div class="rel-kpi-num">${list.filter(l=>l.status==='ativo').length}</div><div class="rel-kpi-label">Ativas</div></div>
    <div class="rel-kpi orange"><div class="rel-kpi-num">${list.filter(l=>l.status==='vencendo').length}</div><div class="rel-kpi-label">A Vencer (≤30 dias)</div></div>
    <div class="rel-kpi red"><div class="rel-kpi-num">${list.filter(l=>l.status==='expirado').length}</div><div class="rel-kpi-label">Expiradas</div></div>
    <div class="rel-kpi teal"><div class="rel-kpi-num">${totalQtd}</div><div class="rel-kpi-label">Total de Assentos</div></div>
    <div class="rel-kpi purple"><div class="rel-kpi-num">R$ ${totalValor.toLocaleString('pt-BR',{minimumFractionDigits:2})}</div><div class="rel-kpi-label">Investimento Total</div></div>
    <div class="rel-kpi blue"><div class="rel-kpi-num">${list.filter(l=>diasParaVencer(l.vencimento)<=90&&diasParaVencer(l.vencimento)>0).length}</div><div class="rel-kpi-label">Vencem em 90 dias</div></div>
    <div class="rel-kpi teal"><div class="rel-kpi-num">${list.filter(l=>l.vencimento==='9999-12-31').length}</div><div class="rel-kpi-label">Perpétuas</div></div>
  </div>

  <div class="card mb-20">
    <div class="card-header" style="background:var(--primary);padding:14px 20px">
      <span class="card-title" style="color:white;font-size:15px"><i class="ti ti-license"></i> Licenças de Software — Detalhamento Completo (${list.length})</span>
    </div>
    <div class="table-wrapper">
      <table class="rel-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Software</th>
            <th>Fornecedor</th>
            <th>Tipo</th>
            <th>Qtd Licenças</th>
            <th>Unidade</th>
            <th>Chave / Código</th>
            <th>Data Compra</th>
            <th>Data Vencimento</th>
            <th>Dias Restantes</th>
            <th>Valor (R$)</th>
            <th>Status</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          ${list.length === 0
            ? '<tr><td colspan="13"><div class="empty-state"><i class="ti ti-license-off"></i><h3>Nenhuma licença</h3></div></td></tr>'
            : list.map((l,i)=>{
                const dias=diasParaVencer(l.vencimento);
                const ac=dias<=30?'var(--danger)':dias<=90?'var(--warning)':'var(--success)';
                const diasLabel=dias>=9999?'Perpétua':`${dias} dias`;
                return `<tr class="${i%2===1?'rel-row-alt':''}">
                  <td><strong style="color:var(--primary)">#${l.id}</strong></td>
                  <td><strong style="font-size:13px">${l.nome}</strong></td>
                  <td style="font-size:13px">${l.fornecedor}</td>
                  <td><span class="badge badge-reservado" style="font-size:11px">${l.tipo}</span></td>
                  <td style="text-align:center"><strong style="font-size:14px">${l.quantidade}</strong></td>
                  <td style="font-size:12px">${l.unidade}</td>
                  <td style="font-size:11px;font-family:monospace;color:var(--gray-500)">${l.chave||'—'}</td>
                  <td style="font-size:12px;white-space:nowrap">${formatDate(l.dataCompra)}</td>
                  <td style="font-size:12px;white-space:nowrap"><strong style="color:${ac}">${formatDate(l.vencimento)}</strong></td>
                  <td style="font-size:12px;white-space:nowrap"><strong style="color:${ac}">${diasLabel}</strong></td>
                  <td style="font-size:12px;white-space:nowrap;text-align:right"><strong>R$ ${l.valor.toLocaleString('pt-BR',{minimumFractionDigits:2})}</strong></td>
                  <td><span class="badge badge-${l.status==='ativo'?'fechado':l.status==='vencendo'?'andamento':'suspenso'}" style="font-size:11px">${l.status}</span></td>
                  <td style="font-size:11px;color:var(--gray-500)">${l.obs||'—'}</td>
                </tr>`;
              }).join('')}
        </tbody>
        <tfoot>
          <tr style="background:var(--gray-50);font-weight:700">
            <td colspan="4" style="padding:10px 14px;font-size:13px">TOTAIS</td>
            <td style="text-align:center;padding:10px 14px">${totalQtd}</td>
            <td colspan="5" style="padding:10px 14px"></td>
            <td style="text-align:right;padding:10px 14px;color:var(--primary)">R$ ${totalValor.toLocaleString('pt-BR',{minimumFractionDigits:2})}</td>
            <td colspan="2" style="padding:10px 14px"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
  ${relPrintFooter()}`;
}

// ============================================================
// RELATÓRIO: EQUIPAMENTOS
// ============================================================
function renderRelEquipamentos() {
  const f = getRelFiltros();
  let list = STATE.equipamentos;
  if (f.uni) list = list.filter(e => e.unidade === f.uni);
  if (f.st)  list = list.filter(e => e.status === f.st);
  const qtdTotal = list.reduce((a,e)=>a+(e.quantidade||1),0);
  return `
  ${relPrintHeader('Relatório de Equipamentos')}
  <div class="rel-filter-summary">
    <span><i class="ti ti-filter"></i> Filtros:</span>
    <span class="rel-filter-tag">${f.uni||'Todas as unidades'}</span>
    ${f.st ? `<span class="rel-filter-tag">Status: ${f.st}</span>` : ''}
  </div>

  <div class="rel-kpi-grid">
    <div class="rel-kpi blue"><div class="rel-kpi-num">${list.length}</div><div class="rel-kpi-label">Tipos Cadastrados</div></div>
    <div class="rel-kpi teal"><div class="rel-kpi-num">${qtdTotal}</div><div class="rel-kpi-label">Quantidade Total</div></div>
    <div class="rel-kpi green"><div class="rel-kpi-num">${list.filter(e=>e.status==='disponivel').length}</div><div class="rel-kpi-label">Disponíveis</div></div>
    <div class="rel-kpi orange"><div class="rel-kpi-num">${list.filter(e=>e.status==='reservado').length}</div><div class="rel-kpi-label">Reservados</div></div>
    <div class="rel-kpi red"><div class="rel-kpi-num">${list.filter(e=>e.status==='manutencao').length}</div><div class="rel-kpi-label">Em Manutenção</div></div>
    <div class="rel-kpi gray"><div class="rel-kpi-num">${list.filter(e=>e.status==='inativo').length}</div><div class="rel-kpi-label">Inativos</div></div>
    <div class="rel-kpi blue"><div class="rel-kpi-num">${list.filter(e=>e.unidade==='Matriz').length}</div><div class="rel-kpi-label">Unidade Matriz</div></div>
    <div class="rel-kpi purple"><div class="rel-kpi-num">${list.filter(e=>e.unidade==='Ensino Médio').length}</div><div class="rel-kpi-label">Ensino Médio</div></div>
  </div>

  <div class="card mb-20">
    <div class="card-header" style="background:var(--primary);padding:14px 20px">
      <span class="card-title" style="color:white;font-size:15px"><i class="ti ti-devices"></i> Equipamentos — Detalhamento Completo (${list.length} registros | ${qtdTotal} unidades)</span>
    </div>
    <div class="table-wrapper">
      <table class="rel-table">
        <thead>
          <tr>
            <th>Nome do Equipamento</th>
            <th>Tipo</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Nº Patrimônio</th>
            <th>Nº de Série</th>
            <th>Local / Sala</th>
            <th>Unidade</th>
            <th>Quantidade</th>
            <th>Status</th>
            <th>Descrição / Especificações</th>
          </tr>
        </thead>
        <tbody>
          ${list.length === 0
            ? '<tr><td colspan="11"><div class="empty-state"><i class="ti ti-devices-off"></i><h3>Nenhum equipamento</h3></div></td></tr>'
            : list.map((e,i)=>`
            <tr class="${i%2===1?'rel-row-alt':''}">
              <td><strong style="font-size:13px">${e.nome}</strong></td>
              <td><span class="badge badge-reservado" style="font-size:11px">${e.tipo}</span></td>
              <td style="font-size:13px"><strong>${e.marca||'—'}</strong></td>
              <td style="font-size:12px">${e.modelo||'—'}</td>
              <td><code style="font-size:11px;background:var(--gray-100);padding:2px 5px;border-radius:4px">${e.patrimonio}</code></td>
              <td style="font-size:11px;color:var(--gray-500)">${e.serie||'—'}</td>
              <td style="font-size:12px">${e.local||'—'}</td>
              <td style="font-size:12px">${e.unidade}</td>
              <td style="text-align:center"><strong style="font-size:15px;color:var(--primary)">${e.quantidade||1}</strong></td>
              <td>${equipStatus(e.status)}</td>
              <td style="font-size:12px;color:var(--gray-500)">${e.descricao||'—'}</td>
            </tr>`).join('')}
        </tbody>
        <tfoot>
          <tr style="background:var(--gray-50);font-weight:700">
            <td colspan="8" style="padding:10px 14px;font-size:13px">TOTAL DE UNIDADES</td>
            <td style="text-align:center;padding:10px 14px;font-size:16px;color:var(--primary)">${qtdTotal}</td>
            <td colspan="2"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
  ${relPrintFooter()}`;
}

function renderRelatorioCharts() {
  const meses=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

  // Chart: chamados por mês
  const ctx1=document.getElementById('chart-mensal');
  if(ctx1) new Chart(ctx1,{type:'line',data:{labels:meses,datasets:[{label:'Chamados',data:meses.map(()=>Math.floor(Math.random()*8)+1),borderColor:'#0073c8',backgroundColor:'rgba(0,115,200,.1)',tension:.4,fill:true,pointRadius:5,pointBackgroundColor:'#0073c8'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{stepSize:1}}}}});

  // Chart: status chamados
  const ctx_st=document.getElementById('chart-status-rel');
  if(ctx_st) new Chart(ctx_st,{type:'doughnut',data:{labels:['Aberto','Em Andamento','Fechado','Suspenso'],datasets:[{data:[STATE.chamados.filter(c=>c.status==='aberto').length,STATE.chamados.filter(c=>c.status==='andamento').length,STATE.chamados.filter(c=>c.status==='fechado').length,STATE.chamados.filter(c=>c.status==='suspenso').length],backgroundColor:['#e74c3c','#e67e22','#27ae60','#95a5a6'],borderWidth:2,borderColor:'#fff'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{family:'Nunito',size:12}}}}}});

  // Chart: prioridade
  const ctx2=document.getElementById('chart-prio');
  if(ctx2) new Chart(ctx2,{type:'pie',data:{labels:['Alta','Média','Baixa'],datasets:[{data:[STATE.chamados.filter(c=>c.prioridade==='Alta').length,STATE.chamados.filter(c=>c.prioridade==='Media').length,STATE.chamados.filter(c=>c.prioridade==='Baixa').length],backgroundColor:['#e74c3c','#e67e22','#27ae60'],borderWidth:2,borderColor:'#fff'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{family:'Nunito',size:12}}}}}});

  // Chart: por categoria
  const cats_={};STATE.chamados.forEach(c=>{cats_[c.categoria]=(cats_[c.categoria]||0)+1;});
  const ctx_cat=document.getElementById('chart-cat-rel');
  if(ctx_cat) new Chart(ctx_cat,{type:'bar',data:{labels:Object.keys(cats_),datasets:[{label:'Chamados',data:Object.values(cats_),backgroundColor:['#0073c8','#27ae60','#e67e22','#e74c3c','#7b1fa2','#009688'],borderRadius:6}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{stepSize:1}}}}});

  // Chart: uso por equipamento
  const eu={};STATE.reservas.forEach(r=>{eu[r.equipamentoTipo]=(eu[r.equipamentoTipo]||0)+1;});
  const ctx3=document.getElementById('chart-equip-uso');
  if(ctx3) new Chart(ctx3,{type:'bar',data:{labels:Object.keys(eu),datasets:[{label:'Reservas',data:Object.values(eu),backgroundColor:'#0073c8',borderRadius:6}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{stepSize:1}}}}});

  // Chart: chamados por usuário
  const uu={};STATE.chamados.forEach(c=>{const n=c.solicitante.split(' ')[0];uu[n]=(uu[n]||0)+1;});
  const ctx4=document.getElementById('chart-user');
  if(ctx4) new Chart(ctx4,{type:'bar',data:{labels:Object.keys(uu),datasets:[{label:'Chamados',data:Object.values(uu),backgroundColor:['#0073c8','#27ae60','#e67e22','#7b1fa2'],borderRadius:6}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{stepSize:1}}}}});

  // Chart: por unidade
  const unid={Matriz:STATE.chamados.filter(c=>(c.unidade||'Matriz')==='Matriz').length,'Ensino Médio':STATE.chamados.filter(c=>c.unidade==='Ensino Médio').length};
  const ctx5=document.getElementById('chart-unidade');
  if(ctx5) new Chart(ctx5,{type:'doughnut',data:{labels:Object.keys(unid),datasets:[{data:Object.values(unid),backgroundColor:['#0073c8','#7b1fa2'],borderWidth:2,borderColor:'#fff'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{family:'Nunito',size:12}}}}}});

  // Chart: licenças dias restantes
  const ctx6=document.getElementById('chart-lic');
  if(ctx6) new Chart(ctx6,{type:'bar',data:{labels:STATE.licencas.map(l=>l.nome.split(' ').slice(0,2).join(' ')),datasets:[{label:'Dias restantes',data:STATE.licencas.map(l=>Math.min(diasParaVencer(l.vencimento),730)),backgroundColor:STATE.licencas.map(l=>diasParaVencer(l.vencimento)<=30?'#e74c3c':diasParaVencer(l.vencimento)<=90?'#e67e22':'#27ae60'),borderRadius:6}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}});

  // Chart: equipamentos por status
  const eq_st={Disponível:STATE.equipamentos.filter(e=>e.status==='disponivel').length,Reservado:STATE.equipamentos.filter(e=>e.status==='reservado').length,Manutenção:STATE.equipamentos.filter(e=>e.status==='manutencao').length,Inativo:STATE.equipamentos.filter(e=>e.status==='inativo').length};
  const ctx_eq=document.getElementById('chart-equip-status');
  if(ctx_eq) new Chart(ctx_eq,{type:'doughnut',data:{labels:Object.keys(eq_st),datasets:[{data:Object.values(eq_st),backgroundColor:['#27ae60','#0073c8','#e67e22','#95a5a6'],borderWidth:2,borderColor:'#fff'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{family:'Nunito',size:12}}}}}});

  // Chart: reservas por mês
  const ctx_rm=document.getElementById('chart-res-mensal');
  if(ctx_rm) new Chart(ctx_rm,{type:'bar',data:{labels:meses,datasets:[{label:'Reservas',data:meses.map(()=>Math.floor(Math.random()*6)+1),backgroundColor:'rgba(0,115,200,.7)',borderRadius:6},{label:'Chamados',data:meses.map(()=>Math.floor(Math.random()*5)+1),backgroundColor:'rgba(231,76,60,.7)',borderRadius:6}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{family:'Nunito',size:12}}}},scales:{y:{beginAtZero:true,ticks:{stepSize:1}}}}});
}


// ===== MODALS: RESERVA =====
function openModalReserva(reservaId=null, preData=null) {
  const r=reservaId?STATE.reservas.find(r=>r.id===reservaId):null;
  const TIPOS=['Notebook','iPad','Tablet','Projetor','Caixa de Som','Microfone','Câmera','Filmadora','Monitor','Impressora',...[...new Set(STATE.equipamentos.map(e=>e.tipo))].filter(t=>!['Notebook','iPad','Tablet','Projetor','Caixa de Som','Microfone','Câmera','Filmadora','Monitor','Impressora'].includes(t)),'Outro'];
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
          <div style="position:relative">
          <input type="text" id="res-nome" placeholder="Nome do solicitante" value="${r?.solicitante||''}" autocomplete="off" oninput="showUserSuggest(this,'res-nome-list')" />
          <div id="res-nome-list" class="autocomplete-list" style="display:none"></div>
        </div>
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
  // Garante que o equipamento já salvo apareça mesmo que esteja com outro status
  const jaEstaNaLista=list.some(e=>e.nome===selectedEquip);
  const equipSalvo=selectedEquip&&!jaEstaNaLista?STATE.equipamentos.find(e=>e.nome===selectedEquip):null;
  const extraOption=equipSalvo?`<option value="${equipSalvo.id}" selected>${equipSalvo.nome} (${equipSalvo.status})</option>`:'';
  sel.innerHTML=`<option value="">Selecione...</option>${extraOption}${list.map(e=>`<option value="${e.id}" ${e.nome===selectedEquip?'selected':''}>${e.nome} (${e.status})</option>`).join('')}<option value="outro">Outro (especificar)</option>`;
}
function checkOutroEquip(){ const sel=$('#res-equip'), og=$('#res-outro-equip-group'); if(og) og.style.display=sel?.value==='outro'?'':'none'; }
function toggleOutroSala(sel){ const g=$('#res-outro-sala-group'); if(g) g.style.display=sel.value==='Outro'?'':'none'; }
function changeQty(d){ const i=$('#res-qtd'); if(i) i.value=Math.max(1,Math.min(99,parseInt(i.value)+d)); }
function editReserva(id){ openModalReserva(id); }

function salvarReserva(id) {
  const reservaAtual = id ? STATE.reservas.find(r=>r.id===id) : null;
  const tipo=$('#res-tipo')?.value || (reservaAtual?.equipamentoTipo||'');
  const equipVal=$('#res-equip')?.value;
  // Se o campo equipamento estiver vazio mas estivermos editando, mantém o nome já salvo
  let equipNome='';
  if(equipVal==='outro') {
    equipNome=($('#res-outro-equip')?.value||'').trim();
  } else if(equipVal && equipVal!=='') {
    equipNome=STATE.equipamentos.find(e=>e.id==equipVal)?.nome||equipVal;
  } else if(reservaAtual) {
    equipNome=reservaAtual.equipamento; // mantém o equipamento já salvo
  }
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
          <select id="ch-cat"><option value="">Selecione...</option>${['Hardware','Software','Rede','Impressora','Acesso/Senha','E-mail','Telefone IP','Câmera','Sistema','Vídeo','Áudio/Som','Office','Internet/Web','Liberar Acesso','Canvas','Sophia','Verificar Vírus','Outro'].map(o=>`<option ${c?.categoria===o?'selected':''}>${o}</option>`).join('')}</select>
        </div>
        <div class="form-group">
          <label class="required">Prioridade</label>
          <select id="ch-prio">${['Baixa','Media','Alta'].map(p=>`<option ${c?.prioridade===p?'selected':''}>${p}</option>`).join('')}</select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="required">Solicitante</label>
          <div style="position:relative">
          <input type="text" id="ch-sol" value="${c?.solicitante||''}" autocomplete="off" oninput="showUserSuggest(this,'ch-sol-list')" placeholder="Nome do solicitante" />
          <div id="ch-sol-list" class="autocomplete-list" style="display:none"></div>
        </div>
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
  const chamadoAtual = id ? STATE.chamados.find(c=>c.id===id) : null;
  const titulo=($('#ch-titulo')?.value||'').trim() || (chamadoAtual?.titulo||'');
  const cat=$('#ch-cat')?.value || (chamadoAtual?.categoria||'');
  const prio=$('#ch-prio')?.value || (chamadoAtual?.prioridade||'');
  const sol=($('#ch-sol')?.value||'').trim() || (chamadoAtual?.solicitante||'');
  const atrib=$('#ch-atrib')?.value ?? (chamadoAtual?.atribuido||'');
  const desc=($('#ch-desc')?.value||'').trim() || (chamadoAtual?.descricao||'');
  const unidade=$('#ch-unidade')?.value || (chamadoAtual?.unidade||'Matriz');
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
      <div class="form-row">
        <div class="form-group"><label>Quantidade</label>
          <div class="qty-control">
            <button class="qty-btn" type="button" onclick="changeQtyEq(-1)">−</button>
            <input class="qty-value" type="number" id="eq-qtd" value="${e?.quantidade||1}" min="1" max="999"/>
            <button class="qty-btn" type="button" onclick="changeQtyEq(1)">+</button>
          </div>
        </div>
        <div class="form-group"><label>Descrição / Especificações</label><input type="text" id="eq-desc" value="${e?.descricao||''}"/></div>
      </div>
      <div class="form-group">
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
          <input type="checkbox" id="eq-add-inv" ${!e?'checked':''} style="width:16px;height:16px;accent-color:var(--primary)">
          <span>Adicionar automaticamente ao <strong>Inventário TI</strong></span>
        </label>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-primary" onclick="salvarEquipamento(${equipId||'null'})"><i class="ti ti-check"></i> Salvar</button>
    </div>
  </div>`);
}
function editEquipamento(id){ openModalEquipamento(null, id); }
function changeQtyEq(d){ const i=$('#eq-qtd'); if(i) i.value=Math.max(1,Math.min(999,parseInt(i.value)+d)); }

function salvarEquipamento(id) {
  const nome=$('#eq-nome')?.value.trim(), tipo=$('#eq-tipo')?.value, pat=$('#eq-pat')?.value.trim();
  if(!nome||!tipo||!pat){ toast('Preencha nome, tipo e patrimônio.','error'); return; }
  const qtd=parseInt($('#eq-qtd')?.value)||1;
  const addInv=$('#eq-add-inv')?.checked;
  const data={ nome, tipo, patrimonio:pat, marca:$('#eq-marca')?.value||'', modelo:$('#eq-modelo')?.value||'', serie:$('#eq-serie')?.value||'', local:$('#eq-local')?.value||'', unidade:$('#eq-unidade')?.value||'Matriz', status:$('#eq-status')?.value||'disponivel', descricao:$('#eq-desc')?.value||'', quantidade:qtd };
  if(id){
    const e=STATE.equipamentos.find(e=>e.id===id); if(e) Object.assign(e,data);
    // sync inventario if exists
    const inv=STATE.inventario.find(i=>i.patrimonio===pat);
    if(inv) Object.assign(inv,{ nome, marca:data.marca, modelo:data.modelo, serie:data.serie, local:data.local, unidade:data.unidade, status:data.status==='disponivel'?'ativo':data.status, quantidade:qtd });
    toast('Equipamento atualizado!');
  } else {
    STATE.equipamentos.push({id:STATE.nextId.equipamento++,...data});
    if(addInv){
      STATE.inventario.push({ id:STATE.nextId.inventario++, nome, categoria:tipo, tipo, marca:data.marca, modelo:data.modelo, patrimonio:pat, serie:data.serie, ip:'', local:data.local, unidade:data.unidade, garantia:'', status:'ativo', obs:data.descricao, quantidade:qtd });
      toast('Equipamento cadastrado e adicionado ao Inventário!');
    } else {
      toast('Equipamento cadastrado!');
    }
  }
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

// ===== NAV GROUP TOGGLE =====
function toggleNavGroup(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const isOpen = el.style.display !== 'none';
  el.style.display = isOpen ? 'none' : 'block';
  const btn = el.previousElementSibling;
  if (btn) {
    const chevron = btn.querySelector('.nav-chevron');
    if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
  }
}

// ===== PAGINA UNIDADE (filtrada por unidade) =====
function paginaUnidade(tipo, unidade) {
  const uni = unidade;
  const uSlug = unidade === 'Matriz' ? 'mz' : 'em';
  if (tipo === 'reservas') {
    const list = STATE.reservas.filter(r=>(r.unidade||'Matriz')===uni && r.status!=='fechado'&&r.status!=='cancelado');
    return `
    <div class="filter-bar">
      <div class="search-bar"><i class="ti ti-search"></i><input type="text" placeholder="Buscar reserva..." id="search-uni-res"/></div>
      <select class="filter-select" id="filter-uni-res-st"><option value="">Todos</option><option value="ativo">Ativo</option><option value="suspenso">Suspenso</option></select>
      <button class="btn btn-primary" onclick="openModalReservaUnidade('${uni}')"><i class="ti ti-plus"></i> Nova Reserva</button>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="ti ti-calendar-event"></i> Reservas — ${uni} (${list.length})</span></div>
      <div class="table-wrapper"><table><thead><tr><th>Equipamento</th><th>Solicitante</th><th>Cargo</th><th>Sala</th><th>Data</th><th>Horário</th><th>Qtd</th><th>Status</th><th>Ações</th></tr></thead>
      <tbody>${renderReservasRows(list)}</tbody></table></div>
    </div>`;
  }
  if (tipo === 'chamados') {
    const list = STATE.chamados.filter(c=>(c.unidade||'Matriz')===uni && c.status!=='fechado'&&c.status!=='cancelado');
    return `
    <div class="filter-bar">
      <button class="btn btn-primary" onclick="openModalChamadoUnidade('${uni}')"><i class="ti ti-plus"></i> Novo Chamado</button>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="ti ti-headset"></i> Chamados — ${uni} (${list.length})</span></div>
      <div class="table-wrapper"><table><thead><tr><th>#</th><th>Título</th><th>Categoria</th><th>Prioridade</th><th>Solicitante</th><th>Status</th><th>Criado</th><th>Ações</th></tr></thead>
      <tbody>${renderChamadosRows(list)}</tbody></table></div>
    </div>`;
  }
  if (tipo === 'equipamentos') {
    const list = STATE.equipamentos.filter(e=>e.unidade===uni);
    return `
    <div class="filter-bar">
      <div class="search-bar"><i class="ti ti-search"></i><input type="text" placeholder="Buscar equipamento..." id="search-uni-eq"/></div>
      <button class="btn btn-primary" onclick="openModalEquipamento('${uni}')"><i class="ti ti-plus"></i> Novo Equipamento</button>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="ti ti-devices"></i> Equipamentos — ${uni} (${list.length})</span></div>
      <div class="table-wrapper"><table><thead><tr><th>Nome</th><th>Tipo</th><th>Patrimônio</th><th>Quantidade</th><th>Local</th><th>Status</th><th>Ações</th></tr></thead>
      <tbody id="uni-eq-tbody">${renderUnidadeEquipsQtd(list)}</tbody></table></div>
    </div>`;
  }
  if (tipo === 'licencas') {
    const list = STATE.licencas.filter(l=>l.unidade===uni);
    return `
    <div class="filter-bar">
      <button class="btn btn-primary" onclick="openModalLicenca()"><i class="ti ti-plus"></i> Nova Licença</button>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="ti ti-license"></i> Licenças — ${uni} (${list.length})</span></div>
      <div class="table-wrapper"><table><thead><tr><th>Software</th><th>Fornecedor</th><th>Qtd</th><th>Vencimento</th><th>Dias Restantes</th><th>Status</th><th>Ações</th></tr></thead>
      <tbody>${renderLicRows(list)}</tbody></table></div>
    </div>`;
  }
  if (tipo === 'usuarios') {
    const list = STATE.users.filter(u=>u.unidade===uni);
    return `
    <div class="filter-bar">
      <button class="btn btn-primary" onclick="openModalUsuario()"><i class="ti ti-user-plus"></i> Novo Usuário</button>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="ti ti-users"></i> Usuários — ${uni} (${list.length})</span></div>
      <div class="table-wrapper"><table><thead><tr><th>Usuário</th><th>E-mail</th><th>Login</th><th>Perfil</th><th>Status</th><th>Ações</th></tr></thead>
      <tbody>${renderUserRows(list)}</tbody></table></div>
    </div>`;
  }
  if (tipo === 'relatorios') {
    return `
    <div class="grid-2 mb-20">
      <div class="card"><div class="card-header"><span class="card-title"><i class="ti ti-chart-line"></i> Chamados por Mês — ${uni}</span></div><div class="card-body"><div class="chart-container"><canvas id="chart-uni-mensal"></canvas></div></div></div>
      <div class="card"><div class="card-header"><span class="card-title"><i class="ti ti-chart-pie"></i> Chamados por Prioridade</span></div><div class="card-body"><div class="chart-container"><canvas id="chart-uni-prio"></canvas></div></div></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="ti ti-table"></i> Chamados — ${uni}</span></div>
      <div class="table-wrapper"><table><thead><tr><th>#</th><th>Título</th><th>Categoria</th><th>Prioridade</th><th>Solicitante</th><th>Status</th><th>Criado</th></tr></thead>
      <tbody>${STATE.chamados.filter(c=>c.unidade===uni).map(c=>`<tr><td>#${c.id}</td><td>${c.titulo}</td><td>${c.categoria}</td><td><span style="color:${prioColor(c.prioridade)};font-weight:700">${c.prioridade}</span></td><td>${c.solicitante}</td><td><span class="badge badge-${c.status}">${c.status}</span></td><td>${formatDate(c.criado)}</td></tr>`).join('')}</tbody></table></div>
    </div>`;
  }
  return '<p>Seção em desenvolvimento.</p>';
}

function renderUnidadeEquipsQtd(list) {
  if(!list.length) return '<tr><td colspan="7"><div class="empty-state"><i class="ti ti-devices-off"></i><h3>Nenhum equipamento</h3></div></td></tr>';
  return list.map(e=>`<tr>
    <td><strong>${e.nome}</strong></td><td>${e.tipo}</td>
    <td><code style="background:var(--gray-100);padding:2px 6px;border-radius:4px;font-size:12px">${e.patrimonio}</code></td>
    <td><span class="badge badge-reservado" style="font-size:13px">${e.quantidade||1}</span></td>
    <td>${e.local||'—'}</td>
    <td>${equipStatus(e.status)}</td>
    <td><div style="display:flex;gap:4px">
      <button class="btn-icon" onclick="editEquipamento(${e.id})" title="Editar"><i class="ti ti-edit"></i></button>
      <button class="btn-icon" onclick="deleteEquipamento(${e.id})" title="Excluir" style="color:var(--danger)"><i class="ti ti-trash"></i></button>
    </div></td>
  </tr>`).join('');
}

function attachUnidadeEquipFilter(unidade) {
  const s=$('#search-uni-eq');
  if(s) s.addEventListener('input',()=>{
    const q=s.value.toLowerCase();
    const f=STATE.equipamentos.filter(e=>e.unidade===unidade&&(!q||e.nome.toLowerCase().includes(q)));
    const tb=$('#uni-eq-tbody'); if(tb) tb.innerHTML=renderUnidadeEquipsQtd(f);
  });
}

function renderUnidadeCharts(unidade) {
  const meses=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  const ctx1=document.getElementById('chart-uni-mensal');
  if(ctx1) new Chart(ctx1,{type:'bar',data:{labels:meses,datasets:[{label:'Chamados',data:meses.map(()=>Math.floor(Math.random()*5)+1),backgroundColor:'#0073c8',borderRadius:6}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{stepSize:1}}}}});
  const ctx2=document.getElementById('chart-uni-prio');
  const ch=STATE.chamados.filter(c=>c.unidade===unidade);
  if(ctx2) new Chart(ctx2,{type:'doughnut',data:{labels:['Alta','Média','Baixa'],datasets:[{data:[ch.filter(c=>c.prioridade==='Alta').length,ch.filter(c=>c.prioridade==='Media').length,ch.filter(c=>c.prioridade==='Baixa').length],backgroundColor:['#e74c3c','#e67e22','#27ae60'],borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}}}});
}

function openModalReservaUnidade(unidade) { openModalReserva(null, null, unidade); }
function openModalChamadoUnidade(unidade) { openModalChamado(null, unidade); }

// ===== ACOMPANHAMENTOS DE CHAMADO =====
function openModalAcompanhamento(chamadoId) {
  const c = STATE.chamados.find(c => c.id === chamadoId);
  if (!c) return;
  const lista = STATE.acompanhamentos.filter(a => a.chamadoId === chamadoId).sort((a,b)=>b.id-a.id);
  const isAdmin = STATE.currentUser.role === 'admin';

  openModal(`
  <div class="modal modal-lg" style="max-width:680px">
    <div class="modal-header" style="background:var(--gray-800)">
      <span class="modal-title" style="color:white">
        <i class="ti ti-message-circle" style="color:var(--primary-mid)"></i>
        Chamado #${c.id} — ${c.titulo}
      </span>
      <button class="btn-icon" onclick="closeModal()" style="color:white"><i class="ti ti-x"></i></button>
    </div>

    <!-- DETALHES DO CHAMADO -->
    <div style="padding:16px 24px;background:var(--gray-50);border-bottom:1px solid var(--gray-200)">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;font-size:12px">
        <div><span style="color:var(--gray-400);font-weight:600;text-transform:uppercase;font-size:10px">Status</span><br>
          <span class="badge badge-${c.status}" style="margin-top:4px;display:inline-flex">${c.status}</span></div>
        <div><span style="color:var(--gray-400);font-weight:600;text-transform:uppercase;font-size:10px">Prioridade</span><br>
          <strong style="color:${prioColor(c.prioridade)}">${c.prioridade}</strong></div>
        <div><span style="color:var(--gray-400);font-weight:600;text-transform:uppercase;font-size:10px">Categoria</span><br>
          <strong>${c.categoria}</strong></div>
        <div><span style="color:var(--gray-400);font-weight:600;text-transform:uppercase;font-size:10px">Solicitante</span><br>
          <strong>${c.solicitante}</strong></div>
        <div><span style="color:var(--gray-400);font-weight:600;text-transform:uppercase;font-size:10px">Atribuído</span><br>
          <strong>${c.atribuido||'—'}</strong></div>
        <div><span style="color:var(--gray-400);font-weight:600;text-transform:uppercase;font-size:10px">Unidade</span><br>
          <strong>${c.unidade||'Matriz'}</strong></div>
      </div>
      <div style="margin-top:10px;padding:10px 12px;background:white;border-radius:6px;border:1px solid var(--gray-200);font-size:13px;color:var(--gray-600);line-height:1.5">
        <strong style="font-size:11px;color:var(--gray-400);text-transform:uppercase">Descrição:</strong><br>${c.descricao}
      </div>
    </div>

    <!-- TIMELINE DE ACOMPANHAMENTOS -->
    <div class="modal-body" style="padding:20px 24px;max-height:320px;overflow-y:auto" id="acomp-lista">
      ${lista.length === 0
        ? `<div style="text-align:center;padding:30px;color:var(--gray-400)">
            <i class="ti ti-message-off" style="font-size:36px;display:block;margin-bottom:8px"></i>
            <p style="font-size:13px">Nenhum acompanhamento ainda.<br>Adicione o primeiro abaixo.</p>
           </div>`
        : lista.map(a => `
          <div class="acomp-item acomp-${a.tipo}">
            <div class="acomp-avatar">${initials(a.autor)}</div>
            <div class="acomp-body">
              <div class="acomp-header">
                <strong>${a.autor}</strong>
                <span class="acomp-tipo-badge acomp-tipo-${a.tipo}">${{observacao:'Observação',solucao:'Solução',pendencia:'Pendência',retorno:'Retorno ao usuário'}[a.tipo]||a.tipo}</span>
                <span style="margin-left:auto;font-size:11px;color:var(--gray-400)">${formatDate(a.criado)} às ${a.hora}</span>
              </div>
              <div class="acomp-texto">${a.texto.replace(/\n/g,'<br>')}</div>
            </div>
          </div>`).join('')}
    </div>

    <!-- FORMULÁRIO DE NOVO ACOMPANHAMENTO -->
    <div style="padding:16px 24px;border-top:2px solid var(--gray-200);background:white">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">
        <div>
          <label style="font-size:11px;font-weight:700;color:var(--gray-500);text-transform:uppercase;display:block;margin-bottom:4px">Tipo de interação</label>
          <select id="acomp-tipo" style="width:100%;padding:8px 10px;border:1.5px solid var(--gray-200);border-radius:6px;font-family:var(--font);font-size:13px;outline:none">
            <option value="observacao">💬 Observação</option>
            <option value="solucao">✅ Solução / Resolução</option>
            <option value="pendencia">⏳ Pendência</option>
            <option value="retorno">📢 Retorno ao usuário</option>
          </select>
        </div>
        ${isAdmin ? `<div>
          <label style="font-size:11px;font-weight:700;color:var(--gray-500);text-transform:uppercase;display:block;margin-bottom:4px">Alterar status do chamado</label>
          <select id="acomp-status" style="width:100%;padding:8px 10px;border:1.5px solid var(--gray-200);border-radius:6px;font-family:var(--font);font-size:13px;outline:none">
            <option value="">— Manter status atual —</option>
            <option value="aberto">Aberto</option>
            <option value="andamento">Em Andamento</option>
            <option value="pendente">Pendente</option>
            <option value="suspenso">Suspenso</option>
            <option value="fechado">Fechado / Resolvido</option>
          </select>
        </div>` : '<div></div>'}
      </div>
      <div>
        <label style="font-size:11px;font-weight:700;color:var(--gray-500);text-transform:uppercase;display:block;margin-bottom:4px">Mensagem <span style="color:var(--danger)">*</span></label>
        <textarea id="acomp-texto" rows="3" placeholder="Descreva a interação, solução aplicada, pendência encontrada..." style="width:100%;padding:10px 12px;border:1.5px solid var(--gray-200);border-radius:6px;font-family:var(--font);font-size:13px;resize:vertical;outline:none;transition:.15s" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--gray-200)'"></textarea>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px">
        <span style="font-size:12px;color:var(--gray-400)"><i class="ti ti-user" style="font-size:13px"></i> ${STATE.currentUser.nome}</span>
        <div style="display:flex;gap:8px">
          <button class="btn btn-ghost" onclick="closeModal()">Fechar</button>
          <button class="btn btn-primary" onclick="salvarAcompanhamento(${chamadoId})">
            <i class="ti ti-send"></i> Registrar
          </button>
        </div>
      </div>
    </div>
  </div>`);
}

function salvarAcompanhamento(chamadoId) {
  const texto = $('#acomp-texto')?.value.trim();
  const tipo  = $('#acomp-tipo')?.value || 'observacao';
  const novoStatus = $('#acomp-status')?.value || '';
  if (!texto) { toast('Digite a mensagem do acompanhamento.', 'error'); return; }

  const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const novoAcomp = {
    id: STATE.nextId.acompanhamento++,
    chamadoId,
    texto,
    tipo,
    autor: STATE.currentUser.nome,
    criado: dateNow(),
    hora,
  };
  STATE.acompanhamentos.push(novoAcomp);

  // Alterar status se solicitado
  if (novoStatus) {
    const c = STATE.chamados.find(c => c.id === chamadoId);
    if (c) { c.status = novoStatus; c.atualizado = dateNow(); }
  }

  saveState();
  addNotification(`Acompanhamento #${chamadoId}`, `${STATE.currentUser.nome}: ${texto.slice(0,40)}...`, 'ti-message-circle');
  toast('Acompanhamento registrado!');
  closeModal();
  // Reabrir o modal atualizado
  openModalAcompanhamento(chamadoId);
  renderPage(STATE.currentPage);
}

// ===== AUTOCOMPLETE USUÁRIOS =====
function showUserSuggest(input, listId) {
  const val = input.value.toLowerCase();
  const list = document.getElementById(listId);
  if (!list) return;
  if (!val) { list.style.display = 'none'; return; }
  const matches = STATE.users.filter(u => u.status === 'ativo' && u.nome.toLowerCase().includes(val)).slice(0, 6);
  if (!matches.length) { list.style.display = 'none'; return; }
  list.innerHTML = matches.map(u => `
    <div class="autocomplete-item" onmousedown="event.preventDefault();event.stopPropagation();selectUser('${u.nome}','${input.id}','${listId}')">
      <div class="autocomplete-avatar">${initials(u.nome)}</div>
      <div><div style="font-weight:600;font-size:13px">${u.nome}</div><div style="font-size:11px;color:var(--gray-400)">${u.unidade||''} · ${u.role==='admin'?'Admin':'Usuário'}</div></div>
    </div>`).join('');
  list.style.display = 'block';
  // Fecha ao clicar fora — usando mousedown para capturar antes do blur
  const closeHandler = e => {
    if (!list.contains(e.target) && e.target !== input) {
      list.style.display = 'none';
      document.removeEventListener('mousedown', closeHandler);
    }
  };
  document.addEventListener('mousedown', closeHandler);
}

function selectUser(nome, inputId, listId) {
  const input = document.getElementById(inputId);
  const list  = document.getElementById(listId);
  if (input) { input.value = nome; input.focus(); }
  if (list)  list.style.display = 'none';
}

// ===== INIT =====
loadState();
// Auto-atualizar status de licenças ao carregar
STATE.licencas.forEach(l=>{ const d=diasParaVencer(l.vencimento); if(d<=0) l.status='expirado'; else if(d<=30) l.status='vencendo'; });
render();
