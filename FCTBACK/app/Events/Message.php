<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class Message implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $mensaje;
    public $emisor;
    public $receptor;
    public $fecha;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($emisor, $mensaje, $receptor, $fecha)
    {
        $this->mensaje =  $mensaje;
        $this->emisor =  $emisor;
        $this->receptor =  $receptor;
        $this->fecha =  $fecha;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return ['chat'];
    }
    public function broadcastAs()
    {
        return 'message';
    }
}
