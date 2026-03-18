import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import Index from './Index';

vi.mock('lenis', () => ({
  default: class LenisMock {
    raf() {}
    destroy() {}
  },
}));

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    from: vi.fn(),
    to: vi.fn(),
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn(),
    getAll: vi.fn(() => []),
  },
}));

vi.mock('@react-three/fiber', () => ({
  Canvas: (_props: { children: ReactNode }) => <div data-testid="automation-core" />,
  useFrame: vi.fn(),
}));

beforeAll(() => {
  const requestAnimationFrameMock = vi.fn(() => 0);
  const cancelAnimationFrameMock = vi.fn();

  Object.defineProperty(globalThis, 'requestAnimationFrame', {
    writable: true,
    value: requestAnimationFrameMock,
  });

  Object.defineProperty(globalThis, 'cancelAnimationFrame', {
    writable: true,
    value: cancelAnimationFrameMock,
  });
});

describe('Index', () => {
  it('renders the editorial spectacle homepage narrative', () => {
    render(<Index />);

    expect(screen.getAllByRole('link', { name: /see what to automate/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /view our work/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/ai automations/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/websites & brand systems/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/i started this group with the goal of helping small businesses following the covid pandemic/i)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /book a call/i })).not.toBeInTheDocument();
  });
});
