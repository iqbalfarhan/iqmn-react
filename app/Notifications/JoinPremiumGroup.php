<?php

namespace App\Notifications;

use App\Models\Pembayaran;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class JoinPremiumGroup extends Notification
{
    use Queueable;

    public ?Pembayaran $pembayaran;

    /**
     * Create a new notification instance.
     */
    public function __construct(Pembayaran $pembayaran)
    {
        $this->pembayaran = $pembayaran;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $groupName = $this->pembayaran->group->name;
        return (new MailMessage)
            ->line("Halo kamu menerima email ini karena anda ingin join premium {$groupName}. Silahkan klik tombol dibawah ini untuk melihat detail pembayaran kamu")
            ->action('Notification Action', route('pembayaran.show', $this->pembayaran->id))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
