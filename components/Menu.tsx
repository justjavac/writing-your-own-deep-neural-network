export interface MenuProps {
  title: string;
  href: string;
}

export function Menu({ title, href }: MenuProps) {
  return (
    <div class="align-middle mt-1 flex items-center">
      <a class="cursor-pointer text-base font-medium no-underline" href={href}>
        <p class="text-gray-500 hover:text-gray-900 mb-0">{title}</p>
      </a>
    </div>
  );
}
