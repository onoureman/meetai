interface Props {
  children: React.ReactNode
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md rounded-lg border bg-background p-6 md:p-10 text-center">
        {children}
      </div>    
    </div>
  )
}

export default AuthLayout