import { BankAccount } from "@/components/features/panel/finance/types";
import ButtonSecondary from "@/components/ui/button-secondary";
import Image from "next/image";



interface Props {
  account: BankAccount
}

const BankAccountCard: React.FC<Props> = ({account}) => {
  return (
    <div className="rounded-[14px] border border-border bg-surface px-5 py-4.5">
      <span className="text-[11px] font-semibold tracking-wider text-text-secondary uppercase">
        Conta Vinculada
      </span>

      <div className="mt-3 flex items-center gap-3 rounded-xl bg-surface-subtle p-3">
        <Image
          src={account.logo}
          alt={account.bank}
          width={40}
          height={40}
          className="size-10 shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-text-primary">
            {account.bank} - {account.type}
          </p>
          <p className="text-[11px] text-text-tertiary">
            Ag. {account.agency} · CC ●●●●●●● {account.accountLastDigits}
          </p>
        </div>
        <ButtonSecondary
          title="Trocar"
          className="inline-flex  h-8 cursor-pointer items-center justify-center rounded-full border border-primary/30 bg-surface px-4 text-[12px] font-semibold text-primary transition-colors hover:bg-primary/5"
        />

      </div>

    </div>
  )
}

export default BankAccountCard