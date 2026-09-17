export default function Container({ as: Tag = 'div', children, className = '' }) {
  return <Tag className={`page-shell ${className}`}>{children}</Tag>
}
