export type PipelineStage = "screening" | "interview" | "activation" | "hired";

export interface AssignedChecklistItem {
  id: string;
  name: string;
  description: string;
  type: string;
  completed: boolean;
}

export interface AssignedChecklist {
  id: string;
  title: string;
  label?: string;
  isGeneric?: boolean;
  items: AssignedChecklistItem[];
  assignedAt: string; // ISO timestamp
}

export const hiredChecklistTemplate: AssignedChecklist = {
  id: "hired-generic",
  title: "Hired Checklist",
  label: "Generic for all employees",
  isGeneric: true,
  assignedAt: new Date(0).toISOString(), // placeholder, will be overwritten on assign
  items: [
    { id: "h1", name: "HR Documentation", description: "Complete all mandatory HR forms and documentation", type: "File Upload", completed: false },
    { id: "h2", name: "System Access Setup", description: "Set up email, SSO, and required tools access", type: "Checkbox", completed: false },
    { id: "h3", name: "Equipment Allocation", description: "Allocate and record company equipment (laptop, peripherals)", type: "Checkbox", completed: false },
    { id: "h4", name: "Welcome Orientation", description: "Attend company orientation session", type: "Checkbox", completed: false },
    { id: "h5", name: "Team Introduction", description: "Meet the team and key stakeholders", type: "Checkbox", completed: false },
    { id: "h6", name: "Policy Briefing", description: "Review company policies and acknowledge receipt", type: "Checkbox", completed: false }
  ]
};

function getAssignedMap(): Record<string, AssignedChecklist[]> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem('assignedChecklists');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAssignedMap(map: Record<string, AssignedChecklist[]>) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem('assignedChecklists', JSON.stringify(map));
  } catch {
    // ignore storage errors
  }
}

export function assignHiredChecklistForCandidate(candidateId: string, candidateName?: string) {
  const map = getAssignedMap();
  const existing = map[candidateId] || [];
  if (!existing.some(c => c.id === hiredChecklistTemplate.id)) {
    const assigned: AssignedChecklist = {
      ...hiredChecklistTemplate,
      assignedAt: new Date().toISOString(),
      items: hiredChecklistTemplate.items.map(it => ({ ...it, completed: false }))
    };
    map[candidateId] = [...existing, assigned];
    saveAssignedMap(map);
  }
}

export function dispatchStageChange(candidateId: string, newStage: PipelineStage, extra?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  const detail = { candidateId, newStage, ...(extra || {}) };
  window.dispatchEvent(new CustomEvent('candidate-stage-changed', { detail }));
}

function registerAutoTrigger() {
  if (typeof window === 'undefined') return;
  const handler = (e: Event) => {
    const ce = e as CustomEvent;
    const detail = ce.detail || {};
    if (detail.newStage === 'hired' && detail.candidateId) {
      assignHiredChecklistForCandidate(detail.candidateId, detail.candidateName);
    }
  };
  window.addEventListener('candidate-stage-changed', handler);
}

registerAutoTrigger();
