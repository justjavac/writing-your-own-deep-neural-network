export interface MenuProps {
  title: string;
  href: string;
}

export function Menu({ title, href }: MenuProps) {
  return (
    <div class="align-middle mt-1 flex items-center">
      <a class="cursor-pointer" href={href}>
        <p class="font-medium text-gray-500 hover:text-gray-900">{title}</p>
      </a>
    </div>
  );
}
